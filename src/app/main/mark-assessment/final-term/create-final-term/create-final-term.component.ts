import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {studentFinaltermTable} from '../store/final-term.component.reducer';
import {SlideInFromLeft} from '../../../../transitions';

@Component({
  selector: 'app-create-final-term',
  templateUrl: './create-final-term.component.html',
  styleUrls: ['./create-final-term.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class CreateFinalTermComponent implements OnInit {
  totalMarks: number;
  studentsFinaltermTable: studentFinaltermTable[];
  courses: CourseModal[];
  sections: SectionModal[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('fromFinalTerm').subscribe(
      state => {
        console.log(state);
        this.studentsFinaltermTable = state.data.students_final_term;
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
