import { Component, OnInit } from '@angular/core';
import {StudentInformationModel} from './student-information.model';
import * as fromApp from '../../../store/app.reducers';
import * as fromStudentServicesActions from '../store/student-services.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.css']
})
export class StudentInformationComponent implements OnInit {
  public studentInformation: StudentInformationModel;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('fromStudentService').subscribe(
      state => {
        this.studentInformation = state.studentInformation;
      }
    );
  }
}
