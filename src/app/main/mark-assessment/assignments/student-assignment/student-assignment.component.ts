import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {student_assignments_table} from '../store/assignment.component.reducer';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {AssignmentModal} from '../../../../shared/AssignmentModal';
import {SlideInFromLeft} from '../../../../transitions';
import {AssignmentApiService} from '../assignment-services/assignment-api.service';
import {MarkAssessmentService} from '../../mark-assessment.service';
import {AssessmentTypes} from '../../../../shared/AssessmentTypes';


export interface AssessmentTable {
  YEAR: number;
  C_CODE: number;
  MAJ_ID: number;
  RN: number;
  ROLNO: string;
  ASS_OBT_MRKS: number;
  ASS_TOT_MRKS: number;
  FILEPATH: string;

}


@Component({
  selector: 'app-student-assignment',
  templateUrl: './student-assignment.component.html',
  styleUrls: ['./student-assignment.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class StudentAssignmentComponent implements OnInit {

  totalMarks: number;
  studentsAssignmentTable: Array<AssessmentTable>;
  assignments: Array<AssignmentModal>;
  courses: Array<CourseModal>;
  sections: Array<SectionModal>;
  @ViewChild('c') selectCourse: ElementRef;
  @ViewChild('s') selectSection: ElementRef;
  @ViewChild('a') selectAssignment: ElementRef;

  constructor(private store: Store<AppState>,
              private assignmentApiService: AssignmentApiService,
              private markAssessmentService: MarkAssessmentService) {
    this.courses = new Array<CourseModal>();
    this.sections = new Array<SectionModal>();
    this.assignments = new Array<AssignmentModal>();
    this.studentsAssignmentTable = new Array<AssessmentTable>();
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
                this.assignmentApiService.getAssignmentList(this.sections[0].sectionTitle,
                  this.courses[0].courseTitle,
                  AssessmentTypes.ASSIGNMENT).subscribe(
                  assignments => {
                    // @ts-ignore
                    for (const assignment of assignments) {
                      this.assignments.push(new AssignmentModal(assignment.ASSIGNMENT_TITLE));
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
      this.selectCourse.nativeElement.value, this.selectAssignment.nativeElement.value, AssessmentTypes.ASSIGNMENT).subscribe(
      students => {
        const list = students as AssessmentTable[];
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

        // Clear Assignments List for new Incoming Assignments
        this.clearAssignments();
        console.log('Course Change New:', this.sections[0].sectionTitle, c.value);


        if (this.sections.length > 0) {
          console.log('called');
          // tslint:disable-next-line:max-line-length
          console.log('Course Change:', this.sections[0].sectionTitle, c.value);
          // tslint:disable-next-line:max-line-length
          this.assignmentApiService.getAssignmentList(this.sections[0].sectionTitle, this.selectCourse.nativeElement.value, AssessmentTypes.ASSIGNMENT).subscribe(
            assignments => {
              // @ts-ignore
              for (const assignment of assignments) {
                this.assignments.push(new AssignmentModal(assignment.ASSIGNMENT_TITLE));
              }
            }
          );
        }
      }
    );
  }


  OnSectionChange(s: HTMLSelectElement) {
    // Clear Assignments Drop Down
    this.clearAssignments();

    console.log();
    console.log(this.selectCourse);
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.assignmentApiService.getAssignmentList(this.selectSection.nativeElement.value, this.selectCourse.nativeElement.value, AssessmentTypes.ASSIGNMENT).subscribe(
      assignments => {
        // @ts-ignore
        for (const assignment of assignments) {
          this.assignments.push(new AssignmentModal(assignment.ASSIGNMENT_TITLE));
        }
      }
    );
  }

  private clearAssignments() {
    for (const assignment of this.assignments) {
      this.assignments.pop();
    }
  }
}
