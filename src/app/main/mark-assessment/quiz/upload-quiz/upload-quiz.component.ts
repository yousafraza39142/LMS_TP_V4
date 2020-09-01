import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {SlideInFromLeft} from '../../../../transitions';
import {MarkAssessmentService} from '../../mark-assessment.service';
import {HttpClient} from '@angular/common/http';
import {AssignmentData} from '../../assignments/store/assignment.component.reducer';
import {baseUrl} from '../../../attendance/attendance-services/attendance.service';

@Component({
  selector: 'app-upload-assignment',
  templateUrl: './upload-quiz.component.html',
  styleUrls: ['./upload-quiz.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class UploadQuizComponent implements OnInit {
  data: AssignmentData;
  courses: Array<CourseModal>;
  sections: Array<SectionModal>;
  myFiles: string[] = [];
  @ViewChild('c') selectCourse: ElementRef;
  @ViewChild('s') selectSection: ElementRef;
  @ViewChild('helpingMaterial') helpingMaterial: ElementRef;
  @ViewChild('title') title: ElementRef;
  @ViewChild('marks') marks: ElementRef;
  @ViewChild('date') dueDate: ElementRef;

  constructor(private store: Store<AppState>, private markAssessmentService: MarkAssessmentService,
              private httpService: HttpClient) {
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

  onSubmit(form: NgForm) {

    // Dont use ngForm values but use childView declared above to get values
    // console.log(form.value);
  }

  getUniqueId(parts: number) {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
  uploadFiles() {
    // tslint:disable-next-line:variable-name
    const _uploadFolderId = this.getUniqueId(2);
    // tslint:disable-next-line:variable-name
    const _userId = 1;
    const frmData = new FormData();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.myFiles.length; i++) {
      frmData.append('fileUpload', this.myFiles[i]);
    }
    // tslint:disable-next-line:max-line-length
    this.httpService.post(`${baseUrl}/api/upload/UploadFiles?fm_id=${JSON.parse(localStorage.getItem('teacherInfo')).FM_ID}&uploadFolderId=` + _uploadFolderId +
      '&userId=' + _userId + '', frmData).subscribe(
      s => {
        // here we are passing the assignment to submitted assignment
        this.httpService.get<any>(`${baseUrl}/api/TeacherUploadAssignment/AssignmentUploadedByTeacher?`,
          {
            params: {
              FM_ID: JSON.parse(localStorage.getItem('teacherInfo')).FM_ID,
              SUB_NM: this.selectCourse.nativeElement.value,
              SECTION: this.selectSection.nativeElement.value,
              ASS_DESC: this.helpingMaterial.nativeElement.value,
              TITLE: this.title.nativeElement.value,
              MARKS: this.marks.nativeElement.value,
              DUE_DATE: this.dueDate.nativeElement.value.replace('T', ' '),
              FILE_ID: s[0].FILE_ID
            }
          }).pipe().subscribe(
          // m => {
          //   console.log('success');
          // }
        );
      }
    );
  }
  getFileDetails(e) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }
}
