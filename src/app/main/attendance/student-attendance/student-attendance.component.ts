import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CourseModal} from '../../../shared/course.modal';
import {SectionModal} from '../../../shared/SectionModal';
import {SlideInFromLeft} from '../../../transitions';
import {AttendanceService} from '../attendance-services/attendance.service';
import {Student} from '../create-attendance/create-attendance.component';
import {MarkAssessmentService} from '../../mark-assessment/mark-assessment.service';


export interface CheckAttendanceDate {
  ATTEND: string;
  C_CODE: number;
  DA_DATE: string;
  MAJ_ID: number;
  RN: number;
  ROLNO: string;
  YEAR: number;
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

  constructor(private markAssessmentService: MarkAssessmentService,
              private attendanceService: AttendanceService) {
    this.courses = new Array<CourseModal>();
    this.sections = new Array<SectionModal>();
    this.students = new Array<CheckAttendanceDate>();
    this.date = new Date();
  }

  ngOnInit(): void {
    /*this.store.select('fromMarkAssessment').subscribe(
      state => {
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


    // this.attendanceService.checkAttendance()
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

  OnSubmit() {
    if (this.dateInput.nativeElement.value === '') {
      return;
    }
    const selectedDate: string[] = this.dateInput.nativeElement.value.split('-');
    this.attendanceService.checkAttendance(this.selectCourse.nativeElement.value,
      this.selectSection.nativeElement.value, `${selectedDate[2]}-${parseInt(selectedDate[1], 0) - 1}-${selectedDate[0]}`,
    ).subscribe(
      stds => {
        // console.log(data);
        // tslint:disable-next-line:forin
        const studentsList = stds as Student[];
        for (let i = 0; i < studentsList.length; i++) {
          // console.log(stds[i]);
          this.students.push(stds[i]);
        }
      }
    );
  }
}
