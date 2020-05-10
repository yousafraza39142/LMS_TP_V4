import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseModal} from '../../../shared/course.modal';
import {SectionModal} from '../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducers';
import {SlideInFromLeft} from '../../../transitions';

@Component({
  selector: 'app-create-attendance',
  templateUrl: './create-attendance.component.html',
  styleUrls: ['./create-attendance.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class CreateAttendanceComponent implements OnInit {
  courses: CourseModal[];
  sections: SectionModal[];

  constructor(private store: Store<AppState>) {
  }

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
