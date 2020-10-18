import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {ProjectModal} from '../../../../shared/ProjectModal';
import {SlideInFromLeft} from '../../../../transitions';
import {AssignmentApiService} from '../../assignments/assignment-services/assignment-api.service';
import {MarkAssessmentService} from '../../mark-assessment.service';
import {AssignmentModal} from '../../../../shared/AssignmentModal';
import {AssessmentTable} from '../../assignments/student-assignment/student-assignment.component';
import {AssessmentTypes} from '../../../../shared/AssessmentTypes';
import {Observable} from 'rxjs';
import {baseUrl} from '../../../attendance/attendance-services/attendance.service';
import {map} from 'rxjs/operators';
import {saveAs} from 'file-saver';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-student-projects',
  templateUrl: './student-projects.component.html',
  styleUrls: ['./student-projects.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class StudentProjectsComponent implements OnInit {
  totalMarks: number;
  studentsProjectTable: Array<AssessmentTable>;
  projects: Array<ProjectModal>;
  courses: Array<CourseModal>;
  sections: Array<SectionModal>;
  @ViewChild('c') selectCourse: ElementRef;
  @ViewChild('s') selectSection: ElementRef;
  @ViewChild('p') selectedProject: ElementRef;
  @ViewChild('marks') marksInp: ElementRef;
  private teacher = {SE_ID: 0, T_NO: 0};

  constructor(private store: Store<AppState>,
              private toastr: ToastrService,
              private httpService: HttpClient,
              private assignmentApiService: AssignmentApiService,
              private markAssessmentService: MarkAssessmentService) {
    this.courses = new Array<CourseModal>();
    this.sections = new Array<SectionModal>();
    this.projects = new Array<ProjectModal>();
    this.studentsProjectTable = new Array<AssessmentTable>();
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
                      this.assignmentApiService.getAssessmentList(this.sections[0].sectionTitle, this.courses[0].courseTitle, AssessmentTypes.PROJECT, this.teacher.T_NO, this.teacher.SE_ID, 11).subscribe(
                        assignments => {
                          // @ts-ignore
                          for (const assignment of assignments) {
                            this.projects.push(new AssignmentModal(assignment.ASSIGNMENT_TITLE));
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

    this.studentsProjectTable = [];


    if (this.selectSection.nativeElement.value === '' ||
      this.selectCourse.nativeElement.value === '' ||
      this.selectedProject.nativeElement.value === '') {
      this.toastr.error('All Fields must be selected');
      return;
    }


    this.toastr.info('Fetching');
    this.assignmentApiService.getAssessmentListOfStudents(this.selectSection.nativeElement.value,
      // tslint:disable-next-line:max-line-length
      this.selectCourse.nativeElement.value, this.selectedProject.nativeElement.value, AssessmentTypes.PROJECT, this.teacher.T_NO, this.teacher.SE_ID, 11).subscribe(
      students => {
        const list = students as AssessmentTable[];
        if (list.length > 0) {
          this.totalMarks = students[0].ASS_TOT_MRKS;
        }
        // @ts-ignore
        for (const std of students) {
          this.studentsProjectTable.push(std);
        }
        console.log(this.studentsProjectTable);
        this.toastr.success('Updated');
      }
    );
  }

  OnCourseChange(c: HTMLSelectElement) {
    // Clear previous sections and projects
    this.sections = new Array<SectionModal>();
    this.projects = [];

    // Fetch New Sections on Course Change
    // tslint:disable-next-line:max-line-length
    this.markAssessmentService.getSectionsForTeacherinCourse(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID, c.value, this.teacher.T_NO, this.teacher.SE_ID, 11).subscribe(
      section => {
        // @ts-ignore
        for (const sec: { SECTION: string } of section) {
          this.sections.push(new SectionModal(sec.SECTION));
        }

        if (this.sections.length > 0) {
          // console.log('Course:', this.selectCourse.nativeElement.value);
          // console.log('Section:', this.selectSection.nativeElement.value);
          // tslint:disable-next-line:max-line-length
          this.assignmentApiService.getAssessmentList(this.sections[0].sectionTitle, this.selectCourse.nativeElement.value, AssessmentTypes.PROJECT, this.teacher.T_NO, this.teacher.SE_ID, 11).subscribe(
            projs => {
              // @ts-ignore
              for (const project of projs) {
                this.projects.push(new ProjectModal(project.ASSIGNMENT_TITLE));
              }
            }
          );
        }
      }
    );
  }

  OnSectionChange(s: HTMLSelectElement) {
    this.projects = [];

    console.log();
    console.log(this.selectCourse);
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.assignmentApiService.getAssessmentList(this.selectSection.nativeElement.value, this.selectCourse.nativeElement.value, AssessmentTypes.PROJECT, this.teacher.T_NO, this.teacher.SE_ID, 11).subscribe(
      assignments => {
        // @ts-ignore
        for (const assignment of assignments) {
          this.projects.push(new AssignmentModal(assignment.ASSIGNMENT_TITLE));
        }
        this.toastr.success('Updated');
      },
      error => {
        this.toastr.error('Error Updating');
      }
    );
  }

  OnMarksChange(param: { std: AssessmentTable; marks: string }) {
    const marks: number = Math.round(parseInt(param.marks, 0));
    console.log(marks);
    console.log(typeof marks);
    if (marks > this.totalMarks || marks < 0 || Number.isNaN(marks)) {
      this.toastr.error('Invalid Marks');
      return;
    }
    console.log(param.std, param.marks);
    console.log(this.selectSection.nativeElement.value, this.selectedProject.nativeElement.value, this.selectCourse.nativeElement.value);
    // tslint:disable-next-line:max-line-length
    this.markAssessmentService.markAssessment(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID, param.std.YEAR, param.std.C_CODE, param.std.D_ID, param.std.MAJ_ID, param.std.RN, this.selectCourse.nativeElement.value, this.selectSection.nativeElement.value, this.selectedProject.nativeElement.value, AssessmentTypes.PROJECT, marks, this.teacher.T_NO, this.teacher.SE_ID)
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
