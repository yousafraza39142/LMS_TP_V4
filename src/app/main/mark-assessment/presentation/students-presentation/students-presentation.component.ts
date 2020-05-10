import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {PresentationData, PresentationTable} from '../store/presentation.component.reducer';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {PresentationModal} from '../../../../shared/PresentationModal';
import {SlideInFromLeft} from '../../../../transitions';

@Component({
  selector: 'app-students-presentation',
  templateUrl: './students-presentation.component.html',
  styleUrls: ['./students-presentation.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class StudentsPresentationComponent implements OnInit {
  totalMarks: number;
  presentationTable: PresentationTable[];
  presentations: PresentationModal[];
  courses: CourseModal[];
  sections: SectionModal[];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('fromPresentation').subscribe(
      state => {
        this.totalMarks = state.data.totalMarks;
        this.presentationTable = state.data.students_presentation;
        this.presentations = state.data.presentations;
      }
    );
    this.store.select('fromMarkAssessment').subscribe(
      state => {
        this.courses = state.courses;
        this.sections = state.sections;
      }
    );
  }

  OnSubmit(form: NgForm) {
    console.log(form.value);
  }
}
