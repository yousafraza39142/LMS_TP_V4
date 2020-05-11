import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromCourseUpload from './store/course-upload.actions';
import {CourseUpload, UploadResponse} from './store/course-upload.reducer';
import {SlideInFromLeft} from '../../transitions';
import {CourseModal} from '../../shared/course.modal';
import {SectionModal} from '../../shared/SectionModal';
import {AppState} from '../../store/app.reducers';
import {AssignmentApiService} from '../mark-assessment/assignments/assignment-services/assignment-api.service';
import {MarkAssessmentService} from '../mark-assessment/mark-assessment.service';
import {AssignmentModal} from '../../shared/AssignmentModal';
import {AssessmentTable} from '../mark-assessment/assignments/student-assignment/student-assignment.component';

@Component({
  selector: 'app-course-upload',
  templateUrl: './course-upload.component.html',
  styleUrls: ['./course-upload.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class CourseUploadComponent implements OnInit {
  show: boolean;
  uploadResponse: UploadResponse;
  info: CourseUpload;
  private file: any;


  courses: Array<CourseModal>;
  sections: Array<SectionModal>;
  @ViewChild('c') selectCourse: ElementRef;
  @ViewChild('s') selectSection: ElementRef;

  constructor(private store: Store<AppState>,
              private assignmentApiService: AssignmentApiService,
              private markAssessmentService: MarkAssessmentService) {
    this.show = false;
    this.courses = new Array<CourseModal>();
    this.sections = new Array<SectionModal>();
  }

  ngOnInit(): void {
    /*this.store.select('fromCourseUpload').subscribe(
      state => {
        this.info = state.info;
      }
    );*/
    this.markAssessmentService.getCourseForTeacher(1).subscribe(
      data => {
        // @ts-ignore
        for (const course: { SUB_NM: string } of data) {
          this.courses.push(new CourseModal(course.SUB_NM));
        }
        if (this.courses.length > 0) {
          this.markAssessmentService.getSectionsForTeacherinCourse(1, this.courses[0].courseTitle).subscribe(
            section => {
              // @ts-ignore
              for (const sec: { SECTION: string } of section) {
                this.sections.push(new SectionModal(sec.SECTION));
              }
            }
          );
        }
      }
    );
  }

  OnCourseChange(c: HTMLSelectElement) {
    // Clear previous sections
    for (const sec of this.sections) {
      this.sections.pop();
    }

    // Fetch New Sections on Course Change
    this.markAssessmentService.getSectionsForTeacherinCourse(1, c.value).subscribe(
      section => {
        // @ts-ignore
        for (const sec: { SECTION: string } of section) {
          this.sections.push(new SectionModal(sec.SECTION));
        }
      }
    );
  }

  onSubmit(form: NgForm) {
    // Testing
    console.log('C:', this.selectCourse.nativeElement.value, this.selectSection.nativeElement.value);
    if (form.invalid) {
      this.show = true;
    } else {
      this.show = false;
      this.uploadResponse = {
        course: form.value.course,
        section: form.value.section,
        title: form.value.title,
        filePath: form.value.filePath,
      };
      this.store.dispatch(new fromCourseUpload.StoreInformation(this.uploadResponse));
      setTimeout(() => {
        this.store.select('fromCourseUpload').subscribe(
          state => {
            console.log(state.response);
          }
        );
      }, 2000);
    }
  }

  onClose() {
    this.show = false;
  }
}
