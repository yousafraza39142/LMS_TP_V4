import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromCourseUpload from './store/course-upload.actions';
import {CourseUpload, UploadResponse} from './store/course-upload.reducer';
import {SlideInFromLeft} from '../../transitions';
import {CourseModal} from '../../shared/course.modal';
import {SectionModal} from '../../shared/SectionModal';
import {AppState} from '../../store/app.reducers';
import {AssignmentApiService} from '../mark-assessment/assignments/assignment-services/assignment-api.service';
import {MarkAssessmentService} from '../mark-assessment/mark-assessment.service';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../attendance/attendance-services/attendance.service';
import {AppComponentEventEmitterService} from '../event-emmiter.service';
import {ToastrService} from 'ngx-toastr';

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
  myFiles: string[] = [];

  courses: Array<CourseModal>;
  sections: Array<SectionModal>;
  @ViewChild('c') selectCourse: ElementRef;
  @ViewChild('s') selectSection: ElementRef;
  @ViewChild('title') title: ElementRef;
  @ViewChild('type') uploadType: ElementRef;
  private teacher = {SE_ID: 0, T_NO: 0};

  constructor(private store: Store<AppState>,
              private assignmentApiService: AssignmentApiService,
              private markAssessmentService: MarkAssessmentService,
              private httpService: HttpClient,
              private toastr: ToastrService,
              private clickEvent: AppComponentEventEmitterService
  ) {
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
    // this.markAssessmentService.getCourseForTeacher(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID).subscribe(
    //   data => {
    //     // @ts-ignore
    //     for (const course: { SUB_NM: string } of data) {
    //       this.courses.push(new CourseModal(course.SUB_NM));
    //     }
    //     if (this.courses.length > 0) {
    //       // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    //       this.markAssessmentService.getSectionsForTeacherinCourse(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID, this.courses[0].courseTitle).subscribe(
    //         section => {
    //           // @ts-ignore
    //           for (const sec: { SECTION: string } of section) {
    //             this.sections.push(new SectionModal(sec.SECTION));
    //           }
    //         }
    //       );
    //     }
    //   }
    // );
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
      }
    );
  }

  OnCourseChange(c: HTMLSelectElement) {
    // // Clear previous sections
    // for (const sec of this.sections) {
    //   this.sections.pop();
    // }
    //
    // // Fetch New Sections on Course Change
    // this.markAssessmentService.getSectionsForTeacherinCourse(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID, c.value).subscribe(
    //   section => {
    //     // @ts-ignore
    //     for (const sec: { SECTION: string } of section) {
    //       this.sections.push(new SectionModal(sec.SECTION));
    //     }
    //   }
    // );
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
      }
    );
  }

  onSubmit(form: NgForm) {
    // Testing
    // console.log('C:', this.selectCourse.nativeElement.value, this.selectSection.nativeElement.value, this.title.nativeElement.value);
    // if (form.invalid) {
    //   this.show = true;
    // } else {
    //   this.show = false;
    //   this.uploadResponse = {
    //     course: form.value.course,
    //     section: form.value.section,
    //     title: form.value.title,
    //     filePath: form.value.filePath,
    //   };
    //   this.store.dispatch(new fromCourseUpload.StoreInformation(this.uploadResponse));
    //   setTimeout(() => {
    //     this.store.select('fromCourseUpload').subscribe(
    //       // state => {
    //       //   // console.log(state.response);
    //       // }
    //     );
    //   }, 2000);
    // }
  }

  onClose() {
    this.show = false;
  }

  getFileDetails(e) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadFiles() {

    const course = this.selectCourse.nativeElement.value;
    const section = this.selectCourse.nativeElement.value;
    const type = this.selectCourse.nativeElement.value;
    const file = this.myFiles.length;

    if (
      course === '' || course === undefined ||
      section === '' || section === undefined ||
      type === '' || type === undefined ||
      file === 0 || file === undefined || isNaN(file)
    ) {
      this.toastr.error('All Fields Must be filled');
      return;
    }



    // tslint:disable-next-line:variable-name
    const _uploadFolderId = this.getUniqueId(2);
    // tslint:disable-next-line:variable-name
    const _userId = 1;
    const frmData = new FormData();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.myFiles.length; i++) {
      frmData.append('fileUpload', this.myFiles[i]);
    }
    console.log(this.myFiles);
    // tslint:disable-next-line:max-line-length
    this.httpService.post(`${baseUrl}/api/upload/UploadFiles?fm_id=${JSON.parse(localStorage.getItem('teacherInfo')).FM_ID}&uploadFolderId=` + _uploadFolderId +
      '&userId=' + _userId + '', frmData).subscribe(
      s => {
        // here we are passing the assignment to submitted assignment
        // tslint:disable-next-line:max-line-length
        if (this.uploadType.nativeElement.value === 'material'){
          // tslint:disable-next-line:max-line-length
          this.uploadCourseMaterial(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID, this.selectCourse.nativeElement.value, this.selectSection.nativeElement.value, this.title.nativeElement.value, s[0].FILE_ID, this.teacher.T_NO, 11).subscribe(
            value => {
              this.toastr.success('Material Uploaded');
            },
            error => {
              console.log('Error');
              this.toastr.error('Failed to Upload');
            }
          );
        } else {
          // tslint:disable-next-line:max-line-length
          this.uploadCourseOutline(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID, this.selectCourse.nativeElement.value, this.selectSection.nativeElement.value, this.title.nativeElement.value, s[0].FILE_ID, this.teacher.T_NO, 11).subscribe(
            value => {
              this.toastr.success('Outline Uploaded');
            },
            error => {
              console.log('Error');
              this.toastr.error('Failed to Upload');
            }
          );
        }
      }
    );
  }

  // tslint:disable-next-line:max-line-length
  private uploadCourseMaterial(FM_ID: number, SUB_NM: string, SECTION: string, CM_TITLE: string, FILE_ID: number, T_NO: number, C_CODE: number) {
    // tslint:disable-next-line:max-line-length
    return this.httpService.get<any>(`${baseUrl}/api/TeacherCourseMaterialUpload/CourseMaterialUploadByTeacher?FM_ID=${FM_ID}&SUB_NM=${SUB_NM}&SECTION=${SECTION}&CM_TITLE=${CM_TITLE}&FILE_ID=${FILE_ID}&T_NO=${T_NO}&C_CODE=${C_CODE}`);
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

  uploadCourseOutline(FM_ID: number, SUB_NM: string, SECTION: string, CM_TITLE: string, FILE_ID: number, T_NO: number, C_CODE: number) {

    // tslint:disable-next-line:max-line-length
    const url = `${baseUrl}/api/CourseOutline/CourseOutlineUploadByTeacher?FM_ID=${FM_ID}&SUB_NM=${SUB_NM}&SECTION=${SECTION}&CM_TITLE=${CM_TITLE}&FILE_ID=${FILE_ID}&T_NO=${T_NO}&C_CODE=${C_CODE}`;
    return this.httpService.get(url);
  }
}
//FM_ID=${JSON.parse(localStorage.getItem('teacherInfo')).FM_ID}&SUB_NM=${this.selectCourse.nativeElement.value}&SECTION=${this.selectSection.nativeElement.value}&CM_TITLE=${this.title.nativeElement.value}&FILE_ID=${s[0].FILE_ID}&T_NO=${this.teacher.T_NO}&C_CODE=${11}
