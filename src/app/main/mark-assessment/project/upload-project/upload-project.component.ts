import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {studentMidtermTable} from '../../mid-term/store/mid-term.component.reducer';
import {SlideInFromLeft} from '../../../../transitions';

@Component({
  selector: 'app-upload-project',
  templateUrl: './upload-project.component.html',
  styleUrls: ['./upload-project.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class UploadProjectComponent implements OnInit {
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

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
