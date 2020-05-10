import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {PresentationData, PresentationTable} from '../store/presentation.component.reducer';
import {SlideInFromLeft} from '../../../../transitions';

@Component({
  selector: 'app-create-presentation',
  templateUrl: './create-presentation.component.html',
  styleUrls: ['./create-presentation.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class CreatePresentationComponent implements OnInit {
  totalMarks: number;
  presentationTable: PresentationTable[];
  courses: CourseModal[];
  sections: SectionModal[];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('fromPresentation').subscribe(
      state => {
        // console.log(state);
        this.totalMarks = state.data.totalMarks;
        this.presentationTable = state.data.students_presentation;
      }
    );
    this.store.select('fromMarkAssessment').subscribe(
      state => {
        // console.log(state);
        this.courses = state.courses;
        this.sections = state.sections;
      }
    );
  }

  OnSubmit(form: NgForm) {
    console.log(form.value);
  }
}
