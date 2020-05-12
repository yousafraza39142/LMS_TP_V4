import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseModal} from '../../../shared/course.modal';
import {SectionModal} from '../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducers';
import {SlideInFromLeft} from '../../../transitions';
import {MarkAssessmentService} from '../../mark-assessment/mark-assessment.service';
import {AttendanceService} from '../attendance-services/attendance.service';

enum AttendanceStatus {
  present = 'p',
  absent = 'a'
}

export interface Student {
  YEAR: number;
  D_ID: number;
  NM: string;
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
  private currentSection: string;

  constructor(private store: Store<AppState>,
              private markAssessmentService: MarkAssessmentService,
              private attendanceService: AttendanceService) {
    this.courses = new Array<CourseModal>();
    this.sections = new Array<SectionModal>();
    this.students = new Array<Student>();
    this.date = new Date();
    // console.log(this.date.getDate());
    // console.log();
  }

  ngOnInit(): void {
    /*this.store.select('fromMarkAssessment').subscribe(
      state => {
        // console.log(state);
        this.courses = state.courses;
        this.sections = state.sections;
      }
    );*/

    this.markAssessmentService.getCourseForTeacher(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID).subscribe(
      data => {
        // @ts-ignore
        for (const course: { SUB_NM: string } of data) {
          this.courses.push(new CourseModal(course.SUB_NM));
        }
        if (this.courses.length > 0) {
          // tslint:disable-next-line:max-line-length
          this.markAssessmentService.getSectionsForTeacherinCourse(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID, this.courses[0].courseTitle).subscribe(
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
    // Do not get values from form as it can cause bugs.....
    this.currentSection = this.selectSection.nativeElement.value;
    // console.log(this.selectSection.nativeElement.value, this.selectCourse.nativeElement.value);


    // tslint:disable-next-line:forin
    for (const std in this.students) {
      this.students.pop();
    }

    this.attendanceService.getStudentList(this.selectSection.nativeElement.value, this.selectCourse.nativeElement.value).subscribe(
      stdList => {
        const currentSection = this.selectSection.nativeElement.value;
        // @ts-ignore
        for (const std: Student of stdList) {
          this.students.push(std);
          // console.log(this.selectSection.nativeElement.value);
          // tslint:disable-next-line:max-line-length
          this.attendanceService.markAttendance(std.YEAR, std.C_CODE, std.D_ID, std.MAJ_ID, std.RN, this.selectCourse.nativeElement.value, this.currentSection, `${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}`, AttendanceStatus.present)
            .subscribe(
            data => {
             //  console.log(data);
            }
          );
        }
        // console.log(this.students);
      }
    );
    // console.log(form.valid);
  }

  OnToggle(param: { std: Student; toggle: HTMLInputElement }) {
    let attendance = '';
    if (param.toggle.checked) {
      attendance = 'p';
    } else {
      attendance = 'a';
    }
    // console.log(this.selectSection.nativeElement.value);
    // tslint:disable-next-line:max-line-length
    this.attendanceService.markAttendance(param.std.YEAR, param.std.C_CODE, param.std.D_ID, param.std.MAJ_ID, param.std.RN, this.selectCourse.nativeElement.value, this.currentSection, `${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}`, attendance).subscribe(
      data => {
        // console.log(data);
      }
    );
  }

  OnCourseChange(c: HTMLSelectElement) {
    // Clear previous sections
    for (const sec of this.sections) {
      this.sections.pop();
    }

    // Fetch New Sections on Course Change
    this.markAssessmentService.getSectionsForTeacherinCourse(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID, c.value).subscribe(
      section => {
        // @ts-ignore
        for (const sec: { SECTION: string } of section) {
          this.sections.push(new SectionModal(sec.SECTION));
        }
      }
    );
  }

}
