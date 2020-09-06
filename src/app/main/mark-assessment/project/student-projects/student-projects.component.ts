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

  constructor(private store: Store<AppState>,
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
          this.markAssessmentService.getSectionsForTeacherinCourse(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID, this.courses[0].courseTitle).subscribe(
            section => {
              // @ts-ignore
              for (const sec: { SECTION: string } of section) {
                this.sections.push(new SectionModal(sec.SECTION));
              }
              if (this.sections.length > 0) {
                console.log('Course', this.courses[0]);
                console.log('section', this.sections[0]);
                // tslint:disable-next-line:max-line-length
                this.assignmentApiService.getAssessmentList(this.sections[0].sectionTitle, this.courses[0].courseTitle, AssessmentTypes.PROJECT).subscribe(
                  projects => {
                    // @ts-ignore
                    for (const proj of projects) {
                      this.projects.push(new ProjectModal(proj.ASSIGNMENT_TITLE));
                    }
                  }
                );
              }
            }
          );
        }
      }
    );

  }

  onSubmit(form: NgForm) {

    for (const s of this.studentsProjectTable) {
      this.studentsProjectTable.pop();
    }


    if (this.selectSection.nativeElement.value === '' ||
      this.selectCourse.nativeElement.value === '' ||
      this.selectedProject.nativeElement.value === '') {
      return;
    }


    this.assignmentApiService.getAssessmentListOfStudents(this.selectSection.nativeElement.value,
      this.selectCourse.nativeElement.value, this.selectedProject.nativeElement.value, AssessmentTypes.PROJECT).subscribe(
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

        if (this.sections.length > 0) {
          this.clearProjects();
          console.log('Course:', this.selectCourse.nativeElement.value);
          console.log('Section:', this.selectSection.nativeElement.value);
          // tslint:disable-next-line:max-line-length
          this.assignmentApiService.getAssessmentList(this.sections[0].sectionTitle, this.selectCourse.nativeElement.value, AssessmentTypes.PROJECT).subscribe(
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
    // Clear Assignments Drop Down
    this.clearProjects();

    console.log();
    console.log(this.selectCourse);
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.assignmentApiService.getAssessmentList(this.selectSection.nativeElement.value, this.selectCourse.nativeElement.value, AssessmentTypes.PROJECT).subscribe(
      assignments => {
        // @ts-ignore
        for (const assignment of assignments) {
          this.projects.push(new AssignmentModal(assignment.ASSIGNMENT_TITLE));
        }
      }
    );
  }

  private clearProjects() {
    for (const pr of this.projects) {
      this.projects.pop();
    }
  }

  OnMarksChange(param: { std: AssessmentTable; marks: string }) {
    let marks = parseInt(param.marks, 0);
    if (marks > this.totalMarks) {
      marks = this.totalMarks;
      this.marksInp.nativeElement.value = this.totalMarks;
    } else if (marks < 0) {
      marks = 0;
      this.marksInp.nativeElement.value = 0;
    } else if (isNaN(marks)) {
      marks = 0;
      this.marksInp.nativeElement.value = 0;
    }
    console.log(param.std, param.marks);
    console.log(this.selectSection.nativeElement.value, this.selectedProject.nativeElement.value, this.selectCourse.nativeElement.value);
    // tslint:disable-next-line:max-line-length
    this.markAssessmentService.markAssessment(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID, param.std.YEAR, param.std.C_CODE, param.std.D_ID, param.std.MAJ_ID, param.std.RN, this.selectCourse.nativeElement.value, this.selectSection.nativeElement.value, this.selectedProject.nativeElement.value, AssessmentTypes.PROJECT, marks)
      .subscribe(
        data => {
        }
      );
  }
}
