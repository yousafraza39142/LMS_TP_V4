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
    /*this.students = [
      {YEAR: 2016, D_ID: 1, NM: 'Yousaf', C_CODE: 1, MAJ_ID: 1, RN: 1, ROLNO: '1-BSCS-2016'},
      {YEAR: 2016, D_ID: 1, NM: 'Ali', C_CODE: 1, MAJ_ID: 1, RN: 2, ROLNO: '2-BSCS-2016'},
      {YEAR: 2016, D_ID: 1, NM: 'Dan', C_CODE: 1, MAJ_ID: 1, RN: 3, ROLNO: '3-BSCS-2016'}
    ];*/
    this.date = new Date();
  }

  ngOnInit(): void {

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
      },
      error => {
        console.log('Some Error Occured');
      }
    );
  }


  OnSubmit(form: NgForm) {
    // Do not get values from form as it can cause bugs.....
    this.currentSection = this.selectSection.nativeElement.value;


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
          console.log(std);
          // tslint:disable-next-line:max-line-length
          this.attendanceService.markAttendance(std.YEAR, std.C_CODE, std.D_ID, std.MAJ_ID, std.RN, this.selectCourse.nativeElement.value, this.currentSection, `${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}`, AttendanceStatus.absent)
            .subscribe(
              data => {
              }
            );
        }
      }
    );
  }

  OnToggle(param: { std: Student; toggle: HTMLInputElement }) {
    let attendance = '';
    if (param.toggle.checked) {
      attendance = 'p';
    } else {
      attendance = 'a';
    }
    // tslint:disable-next-line:max-line-length
    this.attendanceService.markAttendance(param.std.YEAR, param.std.C_CODE, param.std.D_ID, param.std.MAJ_ID, param.std.RN, this.selectCourse.nativeElement.value, this.currentSection, `${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}`, attendance).subscribe(
      data => {
        // No-Return Data.
      },
      error => {
        console.log('Some Error Occurred');
        // param.toggle.parentElement.style.maxWidth = '50%';
        // param.toggle.parentElement.style.backgroundColor = 'rgba(255,43,43,0.47)';
        // param.toggle.parentElement.style.borderRadius  = '5px';
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
