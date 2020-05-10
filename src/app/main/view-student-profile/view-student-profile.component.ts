import { Component, OnInit } from '@angular/core';
import {CourseModal} from '../../shared/course.modal';
import {SectionModal} from '../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducers';
import {NgForm} from '@angular/forms';
import { SlideInFromLeft } from 'src/app/transitions';

@Component({
  selector: 'app-view-student-profile',
  templateUrl: './view-student-profile.component.html',
  styleUrls: ['./view-student-profile.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class ViewStudentProfileComponent implements OnInit {

  courses: CourseModal[];
  sections: SectionModal[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
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
