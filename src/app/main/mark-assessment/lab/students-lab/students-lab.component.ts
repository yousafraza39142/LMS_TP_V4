import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {LabModal} from '../../../../shared/LabModal';
import {SlideInFromLeft} from '../../../../transitions';
import {AssessmentTable} from '../../assignments/student-assignment/student-assignment.component';
import {AssignmentApiService} from '../../assignments/assignment-services/assignment-api.service';
import {MarkAssessmentService} from '../../mark-assessment.service';
import {AssessmentTypes} from '../../../../shared/AssessmentTypes';
import {saveAs} from 'file-saver';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {AssignmentModal} from '../../../../shared/AssignmentModal';
import {Observable} from 'rxjs';
import {baseUrl} from '../../../attendance/attendance-services/attendance.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-students-lab',
  templateUrl: './students-lab.component.html',
  styleUrls: ['./students-lab.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class StudentsLabComponent implements OnInit {
  totalMarks: number;
  studentsLabTable: Array<AssessmentTable>;
  labs: Array<LabModal>;
  courses: Array<CourseModal>;
  sections: Array<SectionModal>;
  @ViewChild('c') selectCourse: ElementRef;
  @ViewChild('s') selectSection: ElementRef;
  @ViewChild('l') selectLab: ElementRef;
  @ViewChild('marks') marksInp: ElementRef;
  private teacher = {SE_ID: 0, T_NO: 0};

  constructor(private store: Store<AppState>,
              private toastr: ToastrService,
              private httpService: HttpClient,
              private assignmentApiService: AssignmentApiService,
              private markAssessmentService: MarkAssessmentService) {
    this.courses = new Array<CourseModal>();
    this.sections = new Array<SectionModal>();
    this.labs = new Array<LabModal>();
    this.studentsLabTable = new Array<AssessmentTable>();
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
                    if (this.sections.length > 0) {
                      console.log('Course', this.courses[0]);
                      console.log('section', this.sections[0]);
                      // tslint:disable-next-line:max-line-length
                      this.assignmentApiService.getAssessmentList(this.sections[0].sectionTitle, this.courses[0].courseTitle, AssessmentTypes.LAB, this.teacher.T_NO, this.teacher.SE_ID, 11).subscribe(
                        assignments => {
                          // @ts-ignore
                          for (const assignment of assignments) {
                            this.labs.push(new AssignmentModal(assignment.ASSIGNMENT_TITLE));
                          }
                        });
                    }
                  }
                }
              );
            }
          );
        }
      }
    );
  }

  onSubmit(form: NgForm) {

    for (const s of this.studentsLabTable) {
      this.studentsLabTable.pop();
    }
    console.log(this.selectSection.nativeElement.value, this.selectCourse.nativeElement.value, this.selectLab.nativeElement.value);
    if (this.selectSection.nativeElement.value === '' ||
      this.selectCourse.nativeElement.value === '' ||
      this.selectLab.nativeElement.value === '') {
      return;
    }
    this.assignmentApiService.getAssessmentListOfStudents(this.selectSection.nativeElement.value,
      this.selectCourse.nativeElement.value, this.selectLab.nativeElement.value,
      AssessmentTypes.LAB, this.teacher.T_NO, this.teacher.SE_ID, 11).subscribe(
      students => {
        console.log(students);
        const list = students as AssessmentTable[];
        if (list.length > 0) {
          this.totalMarks = students[0].ASS_TOT_MRKS;
        }
        // @ts-ignore
        for (const std of students) {
          console.log(std);
          this.studentsLabTable.push(std);
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
        // @ts-ignore
        for (const sec: { SECTION: string } of section) {
          this.sections.push(new SectionModal(sec.SECTION));
        }


        this.labs = new Array<LabModal>();
        if (this.sections.length > 0) {
          // @ts-ignore
          // tslint:disable-next-line:max-line-length
          this.assignmentApiService.getAssessmentList(this.sections[0].sectionTitle, this.selectCourse.nativeElement.value, AssessmentTypes.LAB, this.teacher.T_NO, this.teacher.SE_ID, 11).subscribe(
            labs => {
              // @ts-ignore
              for (const lab of labs) {
                this.labs.push(new LabModal(lab.ASSIGNMENT_TITLE));
              }
            }
          );
        }
      }
    );
  }


  OnSectionChange(s: HTMLSelectElement) {
    // Clear Assignments Drop Down
    this.labs = new Array<LabModal>();

    console.log();
    console.log(this.selectCourse);
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.assignmentApiService.getAssessmentList(this.selectSection.nativeElement.value, this.selectCourse.nativeElement.value, AssessmentTypes.LAB, this.teacher.T_NO, this.teacher.SE_ID, 11).subscribe(
      labs => {
        // @ts-ignore
        for (const lab of labs) {
          this.labs.push(new LabModal(lab.ASSIGNMENT_TITLE));
        }
      }
    );
  }

  private clearLab() {
    for (const lab of this.labs) {
      this.labs.pop();
    }
  }

  OnMarksChange(param: { std: AssessmentTable; marks: string }) {
    const marks: number = Math.round(parseInt(param.marks, 0));
    console.log(marks);
    console.log(typeof marks);
    /*try {
      marks = parseInt(param.marks, 0);
      marks = Math.round(marks);
    } catch (e) {
      this.toastr.error('Invalid Input');
    }*/
    if (marks > this.totalMarks || marks < 0 || Number.isNaN(marks)) {
      this.toastr.error('Invalid Marks :(');
      return;
    }
    console.log(param.std, param.marks);
    console.log(this.selectSection.nativeElement.value, this.selectLab.nativeElement.value, this.selectCourse.nativeElement.value);
    // tslint:disable-next-line:max-line-length
    this.markAssessmentService.markAssessment(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID, param.std.YEAR, param.std.C_CODE, param.std.D_ID, param.std.MAJ_ID, param.std.RN, this.selectCourse.nativeElement.value, this.selectSection.nativeElement.value, this.selectLab.nativeElement.value, AssessmentTypes.LAB, marks, this.teacher.T_NO, this.teacher.SE_ID)
      .subscribe(
        data => {
          this.toastr.success(`Marks updated for ${param.std.NM}`);
        }
      );
  }
  onAssignmentDownload(FILENAME: string, FILEPATH: string) {
    this.DownLoadFiles(FILEPATH, FILENAME);

  }

  DownLoadFiles(filePath: string, fileName: string) {
    // file type extension
    const checkFileType = fileName.split('.').pop();
    let fileType;
    if (checkFileType === '.txt') {
      fileType = 'text/plain';
    }
    if (checkFileType === '.pdf') {
      fileType = 'application/pdf';
    }
    if (checkFileType === '.doc') {
      fileType = 'application/vnd.ms-word';
    }
    if (checkFileType === '.docx') {
      fileType = 'application/vnd.ms-word';
    }
    if (checkFileType === '.xls') {
      fileType = 'application/vnd.ms-excel';
    }
    if (checkFileType === '.png') {
      fileType = 'image/png';
    }
    if (checkFileType === '.jpg') {
      fileType = 'image/jpeg';
    }
    if (checkFileType === '.jpeg') {
      fileType = 'image/jpeg';
    }
    if (checkFileType === '.gif') {
      fileType = 'image/gif';
    }
    if (checkFileType === '.csv') {
      fileType = 'text/csv';
    }
    this.DownloadFile(filePath)
      .subscribe(
        success => {
          console.log('Success');
          console.log(success);
          saveAs(success, fileName);
        },
        err => {
          console.log('Err');
          console.log(err);
          alert('Server error while downloading file.');
        }
      );
  }

  DownloadFile(filePath: string): Observable<any> {
    return this.httpService.post(baseUrl + '/api/Download/DownloadFile?filePath=' + filePath, '',
      {
        responseType: 'blob',
        observe: 'response'
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          return new Blob([res.body]);
        })
      );
  }
}
