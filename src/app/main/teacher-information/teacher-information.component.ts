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
    // getting the data from the login and storing it in the teacher component
    const obj = JSON.parse(localStorage.getItem('teacherInfo'));
    this.teacherInformation = new TeacherInformationModel();
    this.teacherInformation.FM_ID =  obj.FM_ID;
    this.teacherInformation.NM = obj.NM;
    this.teacherInformation.DES = obj.DES;
    this.teacherInformation.D_ID = obj.D_ID;
    this.teacherInformation.NIC =  obj.NIC;
    this.teacherInformation.DOB =  obj.DOB;
    this.teacherInformation.PH1 = obj.PH1;
    this.teacherInformation.ADD1 = obj.ADD1;
    this.teacherInformation.PHTO = obj.PHTO;
    this.teacherInformation.GENDER = obj.GENDER;
    this.teacherInformation.RELIG = obj.RELIG;
    this.teacherInformation.EMAIL =  obj.EMAIL;
    this.teacherInformation.QUALIFICATION = obj.QUALIFICATION ;
    this.teacherInformation.JOIN_DATE = obj.JOIN_DATE;
    this.teacherInformation.F_ID = obj.F_ID;
    // console.log(this.teacherInformation);
    this.store.select('fromTeacherInformation').subscribe(
      state => {
        state.teacherInformation = this.teacherInformation;
      }
    );
  }
}
