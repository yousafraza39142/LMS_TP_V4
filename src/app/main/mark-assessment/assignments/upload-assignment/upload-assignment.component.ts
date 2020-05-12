import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {AssignmentData} from '../store/assignment.component.reducer';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {SlideInFromLeft} from '../../../../transitions';
import {MarkAssessmentService} from '../../mark-assessment.service';

@Component({
  selector: 'app-upload-assignment',
  templateUrl: './upload-assignment.component.html',
  styleUrls: ['./upload-assignment.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class UploadAssignmentComponent implements OnInit {
  data: AssignmentData;
  courses: Array<CourseModal>;
  sections: Array<SectionModal>;
  @ViewChild('c') selectCourse: ElementRef;
  @ViewChild('s') selectSection: ElementRef;

  constructor(private store: Store<AppState>, private markAssessmentService: MarkAssessmentService) {
    this.courses = new Array<CourseModal>();
    this.sections = new Array<SectionModal>();
  }

  ngOnInit(): void {
    /*this.store.select('fromAssignment').subscribe(
      state => {
        console.log(state.data.assignments);
        this.data = state.data;
      }
    );
    this.store.select('fromMarkAssessment').subscribe(
      state => {
        console.log(state);
        this.courses = state.courses;
        this.sections = state.sections;
      }
    );
*/
    // if Wanna dispatch own courses
    /*this.info = {
      courses: [
        new CourseModal('YOousaf'),
        new CourseModal('Dani'),
        new CourseModal('Math'),
        new CourseModal('Chinese'),
        new CourseModal('Pk.Std')
      ],
        sections: [
        new SectionModal('Section Dani'),
        new SectionModal('Section B'),
        new SectionModal('Section C'),
        new SectionModal('Section E1'),
        new SectionModal('Section Ali')
      ]
    };*/
    // this.store.dispatch(new fromAssignmentActions.StoreData(this.info));

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

    // Dont use ngForm values but use childView declared above to get values
    // console.log(form.value);
  }
}
