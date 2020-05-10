import { Component, OnInit } from '@angular/core';
import {TeacherInformationModel} from './teacher-information.model';
import * as fromApp from '../../store/app.reducers';
import * as fromStudentServicesActions from './store/teacher-information.actions';
import {Store} from '@ngrx/store';
import {SlideInFromLeft} from '../../transitions';

@Component({
  selector: 'app-student-information',
  templateUrl: './teacher-information.component.html',
  styleUrls: ['./teacher-information.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class TeacherInformationComponent implements OnInit {
  public teacherInformation: TeacherInformationModel;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('fromTeacherInformation').subscribe(
      state => {
        this.teacherInformation = state.teacherInformation;
      }
    );
  }
}
