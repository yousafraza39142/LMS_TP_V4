import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AssignmentData} from '../../assignments/store/assignment.component.reducer';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {PresentationData} from '../store/presentation.component.reducer';

@Component({
  selector: 'app-create-presentation',
  templateUrl: './create-presentation.component.html',
  styleUrls: ['./create-presentation.component.css']
})
export class CreatePresentationComponent implements OnInit {
  courses: CourseModal[];
  sections: SectionModal[];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
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
