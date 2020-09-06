import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CourseModal} from '../../../shared/course.modal';
import {SectionModal} from '../../../shared/SectionModal';
import {SlideInFromLeft} from '../../../transitions';
import {AttendanceService} from '../attendance-services/attendance.service';
import {Student} from '../create-attendance/create-attendance.component';
import {MarkAssessmentService} from '../../mark-assessment/mark-assessment.service';
import {ToastrService} from 'ngx-toastr';


export interface CheckAttendanceDate {
  ATTEND: string;
  C_CODE: number;
  DA_DATE: string;
  MAJ_ID: number;
  RN: number;
  ROLNO: string;
  YEAR: number;
  D_ID: number;
  NM: string;
}

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class StudentAttendanceComponent implements OnInit {
  courses: Array<CourseModal>;
  sections: Array<SectionModal>;
  students: Array<CheckAttendanceDate>;
  date: Date;
  @ViewChild('c') selectCourse: ElementRef;
  @ViewChild('s') selectSection: ElementRef;
  @ViewChild('d') dateInput: ElementRef;
  loading = false;
  private course: string;
  private section: string;

  constructor(private markAssessmentService: MarkAssessmentService,
              private toastr: ToastrService,
              private attendanceService: AttendanceService) {
    this.courses = new Array<CourseModal>();
    this.sections = new Array<SectionModal>();
    this.students = new Array<CheckAttendanceDate>();
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
      }
    );
  }

  OnCourseChange(c: HTMLSelectElement) {
    // Clear previous sections
    this.sections = new Array<SectionModal>();

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

  OnSubmit() {
    // Check for any empty entries
    if (this.dateInput.nativeElement.value === '' ||
      this.selectCourse.nativeElement.value === '' ||
      this.selectSection.nativeElement.value === '') {
      console.error('Empty Entries Detected');
      return;
    }

    this.course = this.selectCourse.nativeElement.value;
    this.section = this.selectSection.nativeElement.value;
    this.date = this.dateInput.nativeElement.value;

    this.loading = true;
    this.students = new Array<CheckAttendanceDate>();

    console.log('Submitted');
    console.log(this.dateInput.nativeElement.value);
    console.log(this.selectCourse.nativeElement.value);
    console.log(this.selectSection.nativeElement.value);
    this.attendanceService.checkAttendance(this.selectCourse.nativeElement.value,
      this.selectSection.nativeElement.value, `${this.dateInput.nativeElement.value}`).subscribe(
      stds => {
        this.loading = false;
        // tslint:disable-next-line:forin
        const studentsList = stds as Student[];
        this.students = new Array<CheckAttendanceDate>();
        for (let i = 0; i < studentsList.length; i++) {
          this.students.push(stds[i]);
        }
        console.log(this.students);
      },
      error => {
        this.loading = false;
      }
    );
  }

  OnToggle(checked: boolean, std: CheckAttendanceDate) {
    const attendance = (checked) ? 'p' : 'a';

    // console.log(this.date);
    // console.log(this.course);
    // console.log(this.section);
    // console.log(std);
    // console.log(checked);
    // tslint:disable-next-line:max-line-length
    this.attendanceService.markAttendance(std.YEAR, std.C_CODE, std.D_ID, std.MAJ_ID, std.RN, this.selectCourse.nativeElement.value, this.course, this.date, attendance).subscribe(
      data => {
        this.toastr.success('Updated', '', {timeOut: 500});
      },
      error => {
        console.log('Some Error Occurred');
        this.toastr.error('Failed to Update', '', {timeOut: 500});
      }
    );
  }
}
