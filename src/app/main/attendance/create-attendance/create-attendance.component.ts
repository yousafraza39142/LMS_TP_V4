import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseModal} from '../../../shared/course.modal';
import {SectionModal} from '../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducers';
import {SlideInFromLeft} from '../../../transitions';
import {MarkAssessmentService} from '../../mark-assessment/mark-assessment.service';
import {AttendanceService} from '../attendance-services/attendance.service';

export interface Student {
  YEAR: number;
  C_CODE: number;
  MAJ_ID: number;
  RN: number;
  ROLNO: string;
}

@Component({
  selector: 'app-create-attendance',
  templateUrl: './create-attendance.component.html',
  styleUrls: ['./create-attendance.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class CreateAttendanceComponent implements OnInit {
  courses: Array<CourseModal>;
  sections: Array<SectionModal>;
  students: Array<Student>;
  date: Date;
  @ViewChild('c') selectCourse: ElementRef;
  @ViewChild('s') selectSection: ElementRef;
  course: string;

  constructor(private store: Store<AppState>,
              private markAssessmentService: MarkAssessmentService,
              private attendanceService: AttendanceService) {
    this.courses = new Array<CourseModal>();
    this.sections = new Array<SectionModal>();
    this.students = new Array<Student>();
    this.date = new Date();
    console.log(this.date.getDate());
    console.log();
  }

  ngOnInit(): void {
    /*this.store.select('fromMarkAssessment').subscribe(
      state => {
        // console.log(state);
        this.courses = state.courses;
        this.sections = state.sections;
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


  OnSubmit(form: NgForm) {
    console.log(form.value);
    this.attendanceService.getStudentList(this.selectSection.nativeElement.value, this.selectCourse.nativeElement.value).subscribe(
      stdList => {
        // @ts-ignore
        for (const std: Student of stdList) {
          this.students.push(std);
        }
      }
    );
    // console.log(form.valid);
  }


  OnCourseChange(c: HTMLSelectElement) {
    // console.log(c);
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


  OnToggle(param: { st: Student; toggle: HTMLInputElement }) {
    console.log(param.st, param.toggle.checked);
  }
}
