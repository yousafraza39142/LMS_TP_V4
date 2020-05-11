import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {ProjectModal} from '../../../../shared/ProjectModal';
import {studentProjectsTable} from '../store/project.component.reducer';
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

  constructor(private store: Store<AppState>,
              private assignmentApiService: AssignmentApiService,
              private markAssessmentService: MarkAssessmentService) {
    this.courses = new Array<CourseModal>();
    this.sections = new Array<SectionModal>();
    this.projects = new Array<ProjectModal>();
    this.studentsProjectTable = new Array<AssessmentTable>();
  }

  ngOnInit(): void {

    // this.assignmentApiService.getAssignmentList('A', 'programming fundamental', AssessmentTypes.ASSIGNMENT);
    // tslint:disable-next-line:max-line-length
    // this.assignmentApiService.getAssignmentsListOfStudents('A', 'programming fundamental', 'PRIMS ALGORITHM', AssessmentTypes.ASSIGNMENT);

    /*this.store.select('fromAssignment').subscribe(
      state => {
        console.log(state);
        this.totalMarks = state.data.total_marks;
        this.studentsAssignmentTable = state.data.students_assignments;
        this.assignments = state.data.assignments;
      }
    );
    this.store.select('fromMarkAssessment').subscribe(
      state => {
        console.log(state);
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
              if (this.sections.length > 0) {
                console.log('Course', this.courses[0]);
                console.log('section', this.sections[0]);
                // tslint:disable-next-line:max-line-length
                this.assignmentApiService.getAssignmentList(this.sections[0].sectionTitle, this.courses[0].courseTitle, AssessmentTypes.PROJECT).subscribe(
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
    this.assignmentApiService.getAssignmentsListOfStudents(this.selectSection.nativeElement.value,
      this.selectCourse.nativeElement.value, this.selectedProject.nativeElement.value, AssessmentTypes.ASSIGNMENT).subscribe(
      students => {
        console.log(students);
        const list = students as AssessmentTable[];
        if (list.length > 0) {
          this.totalMarks = students[0].ASS_TOT_MRKS;
        }
        // @ts-ignore
        for (const std of students) {
          console.log(std);
          this.studentsProjectTable.push(std);
        }
      }
    );
  }

  /*onSubmit(form: NgForm) {
    this.assignmentApiService.getAssignmentsListOfStudents(this.selectSection.nativeElement.value,
      this.selectCourse.nativeElement.value, this.selectAssignment.nativeElement.value, AssessmentTypes.ASSIGNMENT).subscribe(
      students => {
        const list = students as AssignmentsStudentList[];
        if (list.length > 0) {
          this.totalMarks = students[0].ASS_TOT_MRKS;
        }
        // @ts-ignore
        for (const std of students) {
          console.log(std);
          this.studentsAssignmentTable.push(std);
        }
      }
    );
  }
*/
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

    this.clearProjects();
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    console.log('Course:', this.selectCourse.nativeElement.value);
    console.log('Section:', this.selectSection.nativeElement.value);
    // tslint:disable-next-line:max-line-length
    this.assignmentApiService.getAssignmentList(this.selectSection.nativeElement.value, this.selectCourse.nativeElement.value, AssessmentTypes.PROJECT).subscribe(
      projs => {
        // @ts-ignore
        // console.log(projects);
        // @ts-ignore
        for (const project of projs) {
          // @ts-ignore
          this.projects.push(new ProjectModal(project.ASSIGNMENT_TITLE));
        }
        console.log(this.projects);
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
    this.assignmentApiService.getAssignmentList(this.selectSection.nativeElement.value, this.selectCourse.nativeElement.value, AssessmentTypes.ASSIGNMENT).subscribe(
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
}
