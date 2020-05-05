import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {LabModal} from '../../../../shared/LabModal';
import {studentLabsTable} from '../store/lab.component.reducer';

@Component({
  selector: 'app-students-lab',
  templateUrl: './students-lab.component.html',
  styleUrls: ['./students-lab.component.css']
})
export class StudentsLabComponent implements OnInit {
  totalMarks: number;
  studentsLabTable: studentLabsTable[];
  labs: LabModal[];
  courses: CourseModal[];
  sections: SectionModal[];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('fromLab').subscribe(
      state => {
        this.totalMarks = state.data.total_marks;
        this.studentsLabTable = state.data.students_labs;
        this.labs = state.data.labs;
  }
    );
    this.store.select('fromMarkAssessment').subscribe(
      state => {
        this.courses = state.courses;
        this.sections = state.sections;
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
