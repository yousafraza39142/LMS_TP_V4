import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {AssignmentData, student_assignments_table} from '../store/assignment.component.reducer';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {AssignmentModal} from '../../../../shared/AssignmentModal';
import {SlideInFromLeft} from '../../../../transitions';

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
  studentsAssignmentTable: student_assignments_table[];
  assignments: AssignmentModal[];
  courses: CourseModal[];
  sections: SectionModal[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('fromAssignment').subscribe(
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
    );
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
