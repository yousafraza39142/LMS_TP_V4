import { Component, OnInit } from '@angular/core';
import {CourseModal} from '../../../shared/course.modal';
import {SectionModal} from '../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducers';
import {SlideInFromLeft} from '../../../transitions';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class StudentAttendanceComponent implements OnInit {
  courses: CourseModal[];
  sections: SectionModal[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('fromMarkAssessment').subscribe(
      state => {
        this.courses = state.courses;
        this.sections = state.sections;
      }
    );
  }

}
