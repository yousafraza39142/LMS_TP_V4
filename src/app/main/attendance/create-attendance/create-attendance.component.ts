import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseModal} from '../../../shared/course.modal';
import {SectionModal} from '../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducers';
import {SlideInFromLeft} from '../../../transitions';
import {MarkAssessmentService} from '../../mark-assessment/mark-assessment.service';
import {AttendanceService} from '../attendance-services/attendance.service';
import {ToastrService} from 'ngx-toastr';

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
  private teacher = {SE_ID: 0, T_NO: 0};


  constructor(private store: Store<AppState>,
              private markAssessmentService: MarkAssessmentService,
              private toastr: ToastrService,
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
          this.markAssessmentService.getSessionAndTermNo(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID, this.courses[0].courseTitle.trim(), 11).subscribe(
            sect => {
              console.log('SESSION ID');
              console.log(sect);
              this.teacher.SE_ID = sect[0].SE_ID;
              this.teacher.T_NO = sect[0].T_NO;

              this.markAssessmentService.getSectionsForTeacherinCourse(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID,
                this.courses[0].courseTitle.trim(), this.teacher.T_NO, this.teacher.SE_ID, 11).subscribe(
                section => {
                  console.log('SECTIONS');
                  console.log(section);
                  // @ts-ignore
                  for (const sec: { SECTION: string } of section) {
                    this.sections.push(new SectionModal(sec.SECTION));
                  }
                }
              );
            }
          );
        }
      },
      error => {
        console.log('Some Error Occurred');
      }
    );
  }


  OnSubmit(form: NgForm) {
    if (this.selectSection.nativeElement.value === '' || this.selectSection.nativeElement.value === '') {
      this.toastr.error('Missing Fields');
      return;
    }
    // Do not get values from form as it can cause bugs.....
    this.currentSection = this.selectSection.nativeElement.value;
    // tslint:disable-next-line:forin

    this.students = new Array<Student>();


    this.toastr.info('Creating Attendance', '', {timeOut: 4000});
    // tslint:disable-next-line:max-line-length
    this.attendanceService.getStudentList(this.selectSection.nativeElement.value, this.selectCourse.nativeElement.value, this.teacher.T_NO, this.teacher.SE_ID, 11).subscribe(
      stdList => {
        this.toastr.success('Attendance Created');
        // console.log(stdList);
        const currentSection = this.selectSection.nativeElement.value;
        // @ts-ignore
        for (const std: Student of stdList) {
          this.students.push(std);
          // console.log(std);
          // tslint:disable-next-line:max-line-length
          this.attendanceService.markAttendance(std.YEAR, std.C_CODE, std.D_ID, std.MAJ_ID, std.RN, this.selectCourse.nativeElement.value, this.currentSection, `${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}`, AttendanceStatus.present, this.teacher.T_NO, this.teacher.SE_ID)
            .subscribe(
              data => {
              },
              error => {
                console.log(error);
              }
            );
        }
      },
      error => {
        this.toastr.error('Failed to create');
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
    this.attendanceService.markAttendance(param.std.YEAR, param.std.C_CODE, param.std.D_ID, param.std.MAJ_ID, param.std.RN, this.selectCourse.nativeElement.value, this.currentSection, `${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}`, attendance, this.teacher.T_NO, this.teacher.SE_ID).subscribe(
      data => {
        console.log(data);
        this.toastr.success('Updated', '', {timeOut: 500});
      },
      error => {
        console.log('Some Error Occurred', '', {timeOut: 500});
      }
    );
  }

  OnCourseChange(c: HTMLSelectElement) {
    // Clear previous sections
    this.sections = new Array<SectionModal>();
    // Fetch New Sections on Course Change
    // tslint:disable-next-line:max-line-length
    this.markAssessmentService.getSectionsForTeacherinCourse(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID, c.value, this.teacher.T_NO, this.teacher.SE_ID, 11).subscribe(
      section => {
        // @ts-ignore
        for (const sec: { SECTION: string } of section) {
          this.sections.push(new SectionModal(sec.SECTION));
        }
      }
    );
  }
}
