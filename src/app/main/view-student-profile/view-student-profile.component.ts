import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CourseModal} from '../../shared/course.modal';
import {SectionModal} from '../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducers';
import {NgForm} from '@angular/forms';
import {SlideInFromLeft} from 'src/app/transitions';
import {MarkAssessmentService} from '../mark-assessment/mark-assessment.service';
import {AttendanceService} from '../attendance/attendance-services/attendance.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-view-student-profile',
  templateUrl: './view-student-profile.component.html',
  styleUrls: ['./view-student-profile.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class ViewStudentProfileComponent implements OnInit, AfterViewInit {


  @ViewChild('c') selectCourse: ElementRef;
  @ViewChild('s') selectSection: ElementRef;
  @ViewChild('selectedStd') selectedStudent: ElementRef;
  courses: CourseModal[] = new Array<CourseModal>();
  sections: SectionModal[] = new Array<SectionModal>();
  students: any[] = new Array<any>();

  private teacher = {SE_ID: 0, T_NO: 0};
  results: any[] = [];

  constructor(private store: Store<AppState>,
              private stdListService: AttendanceService,
              private toastr: ToastrService,
              private attendanceSerivce: AttendanceService,
              private markAssessmentService: MarkAssessmentService) {
  }

  ngOnInit(): void {
    console.log('On Init');
    this.markAssessmentService.getCourseForTeacher(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID).subscribe(
      data => {
        console.log('COURSES');
        console.log(data);
        // @ts-ignore
        for (const course: { SUB_NM: string } of data) {
          this.courses.push(new CourseModal(course.SUB_NM, course.SUB_CODE));
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
                  console.log(this.selectSection.nativeElement.value);
                  if (this.sections.length > 0) {
                    // tslint:disable-next-line:max-line-length
                    this.stdListService.getStudentList(this.sections[0].sectionTitle, this.courses[0].courseTitle, this.teacher.T_NO, this.teacher.SE_ID, 11).subscribe(
                      stds => {
                        console.log( stds );
                        // @ts-ignore
                        for (const std of stds) {
                          this.students.push(std);
                        }
                      }
                    );
                  }
                }
              );
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
    // tslint:disable-next-line:max-line-length
    this.markAssessmentService.getSectionsForTeacherinCourse(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID, c.value, this.teacher.T_NO, this.teacher.SE_ID, 11).subscribe(
      section => {
        this.sections = [];
        // @ts-ignore
        for (const sec: { SECTION: string } of section) {
          this.sections.push(new SectionModal(sec.SECTION));
        }

        this.students = [];
        if (this.sections.length > 0) {
          // tslint:disable-next-line:max-line-length
          this.stdListService.getStudentList(this.sections[0].sectionTitle, this.selectCourse.nativeElement.value, this.teacher.T_NO, this.teacher.SE_ID, 11).subscribe(
            stds => {
              console.log(stds);
              // @ts-ignore
              for (const std of stds) {
                this.students.push(std);
              }
              console.log(this.students);
            }
          );
        }
      }
    );
  }

  OnSectionChange(s: HTMLSelectElement) {
    // Clear Assignments Drop Down
    this.students = new Array<any>();

    console.log(this.selectCourse);
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.stdListService.getStudentList(this.selectSection.nativeElement.value, this.selectCourse.nativeElement.value, this.teacher.T_NO, this.teacher.SE_ID, 11).subscribe(
      stds => {
        console.log(stds);
        // @ts-ignore
        for (const std of stds) {
          this.students.push(std);
        }
        setTimeout(() => {
          this.selectedStudent.nativeElement.value = this.students[0];
        }, 2000);
      }
    );
  }


  OnSubmit() {
    console.log(this.selectCourse.nativeElement.value);
    console.log(this.selectSection.nativeElement.value);
    console.log(this.selectedStudent.nativeElement.value);
    if (
      this.selectSection.nativeElement.value === '' ||
      this.selectSection.nativeElement.value === undefined ||
      this.selectCourse.nativeElement.value === '' ||
      this.selectCourse.nativeElement.value === undefined ||
      this.selectedStudent.nativeElement.value === '' ||
      this.selectedStudent.nativeElement.value === undefined
    ) {
      this.toastr.error('Select All Values');
      return;
    }

    this.toastr.info('Updating');
    console.log('clicked');
    const std = JSON.parse(this.selectedStudent.nativeElement.value);
    console.log(std);
    const subCode = this.courses.filter(
      value => value.courseTitle === this.selectCourse.nativeElement.value
    )[0].courseCode;

    // tslint:disable-next-line:max-line-length
    this.attendanceSerivce.getStudentCourseAttendance(std?.YEAR, std?.C_CODE, std?.D_ID, std?.MAJ_ID, std?.RN, subCode, this.teacher.T_NO, this.teacher.SE_ID).subscribe(
      value => {
        console.log(value);
        this.toastr.success('Updated');
        this.results = value as [];
      },
      error => {
        console.log(error);
        this.toastr.error('Failed to Update');
      }
    );
  }

  ngAfterViewInit(): void {
    console.log(this.selectSection);
  }
}
