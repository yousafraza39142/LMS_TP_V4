import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {studentMidtermTable} from '../store/mid-term.component.reducer';

@Component({
  selector: 'app-students-mid-term',
  templateUrl: './students-mid-term.component.html',
  styleUrls: ['./students-mid-term.component.css']
})
export class StudentsMidTermComponent implements OnInit {
  totalMarks: number;
  studentsMidtermTable: studentMidtermTable[];
  courses: CourseModal[];
  sections: SectionModal[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('fromMidterm').subscribe(
      state => {
        console.log(state);
        this.studentsMidtermTable = state.data.students_mid_term;
        this.totalMarks = state.data.total_marks;
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

  OnSubmit(form: NgForm) {
    console.log(form.value);
  }
}
