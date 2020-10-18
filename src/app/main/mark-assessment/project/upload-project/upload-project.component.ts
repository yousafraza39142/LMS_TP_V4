import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {SlideInFromLeft} from '../../../../transitions';
import {MarkAssessmentService} from '../../mark-assessment.service';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../../../attendance/attendance-services/attendance.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-upload-project',
  templateUrl: './upload-project.component.html',
  styleUrls: ['./upload-project.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class UploadProjectComponent implements OnInit {
  courses: Array<CourseModal>;
  sections: Array<SectionModal>;
  myFiles: string[] = [];
  @ViewChild('c') selectCourse: ElementRef;
  @ViewChild('s') selectSection: ElementRef;
  @ViewChild('helpingMaterial') helpingMaterial: ElementRef;
  @ViewChild('title') title: ElementRef;
  @ViewChild('marks') marks: ElementRef;
  @ViewChild('date') dueDate: ElementRef;
  private teacher = {SE_ID: 0, T_NO: 0};

  constructor(private store: Store<AppState>,
              private toastr: ToastrService,
              private markAssessmentService: MarkAssessmentService,
              private httpService: HttpClient) {
    this.courses = new Array<CourseModal>();
    this.sections = new Array<SectionModal>();
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
      }
    );
  }
  OnCourseChange(c: HTMLSelectElement) {
    // Clear previous sections
    this.sections = new Array<SectionModal>();

    // Fetch New Sections on Course Change
    this.markAssessmentService.getSectionsForTeacherinCourse(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID,
      c.value, this.teacher.T_NO, this.teacher.SE_ID, 11).subscribe(
      section => {
        // @ts-ignore
        for (const sec: { SECTION: string } of section) {
          this.sections.push(new SectionModal(sec.SECTION));
        }
      }
    );
  }
  onSubmit(form: NgForm) {
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

    const course = this.selectCourse.nativeElement.value;
    const section = this.selectCourse.nativeElement.value;
    const helpingMaterial = this.helpingMaterial.nativeElement.value;
    const title = this.title.nativeElement.value;
    const dueDate = this.dueDate.nativeElement.value;
    const marks = this.marks.nativeElement.value;
    const file = this.myFiles?.length;

    if (
      course === '' || course === undefined ||
      section === '' || section === undefined ||
      helpingMaterial === '' || helpingMaterial === undefined ||
      title === '' || title === undefined ||
      dueDate === '' || dueDate === undefined ||
      marks === '' || marks === undefined ||
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

    this.toastr.info('Uploading Assignment...');
    // tslint:disable-next-line:max-line-length
    this.httpService.post(`${baseUrl}/api/upload/UploadFiles?fm_id=${JSON.parse(localStorage.getItem('teacherInfo')).FM_ID}&uploadFolderId=` + _uploadFolderId +
      '&userId=' + _userId + '', frmData).subscribe(
      s => {
        // here we are passing the assignment to submitted assignment
        // tslint:disable-next-line:max-line-length
        this.httpService.get<any>(`${baseUrl}/api/TeacherUploadProject/ProjectUploadedByTeacher?FM_ID=${JSON.parse(localStorage.getItem('teacherInfo')).FM_ID}&SUB_NM=${this.selectCourse.nativeElement.value}&SECTION=${this.selectSection.nativeElement.value}&ASS_DESC=${this.helpingMaterial.nativeElement.value}&TITLE=${this.title.nativeElement.value}&MARKS=${this.marks.nativeElement.value}&DUE_DATE=${this.dueDate.nativeElement.value + ':00'}&FILE_ID=${s[0].FILE_ID}&SE_ID=${this.teacher.SE_ID}&T_NO=${this.teacher.T_NO}&C_CODE=${11}`)
          .pipe().subscribe(
          value => {
            this.toastr.success('Project Uploaded');
          }
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
