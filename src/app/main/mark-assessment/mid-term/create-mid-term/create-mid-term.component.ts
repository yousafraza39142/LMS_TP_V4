import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {studentMidtermTable} from '../store/mid-term.component.reducer';
import {SlideInFromLeft} from '../../../../transitions';

@Component({
  selector: 'app-create-mid-term',
  templateUrl: './create-mid-term.component.html',
  styleUrls: ['./create-mid-term.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class CreateMidTermComponent implements OnInit {
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
