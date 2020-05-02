import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MainComponent} from './main.component';
import {AlertComponent} from './alert/alert.component';
import {ComplaintsComponent} from './complaints/complaints.component';
import {ExaminationComponent} from './examination/examination.component';
import {HomeComponent} from './home/home.component';
import {PreviousCoursesComponent} from './previous-courses/previous-courses.component';
import {StudentServicesComponent} from './student-services/student-services.component';
import {TeacherAssesmentComponent} from './teacher-assesment/teacher-assesment.component';
import {TimeTableComponent} from './time-table/time-table.component';
import {MainRoutingModule} from './main-routing.module';
import {AutoCloseDirective} from './auto.close.directive';
import {AppComponentEventEmitterService} from './event-emmiter.service';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [
    MainComponent,
    AlertComponent,
    ComplaintsComponent,
    ExaminationComponent,
    HomeComponent,
    PreviousCoursesComponent,
    StudentServicesComponent,
    TeacherAssesmentComponent,
    TimeTableComponent,
    AutoCloseDirective
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ChartsModule
  ],
  providers: [AppComponentEventEmitterService]
})
export class MainModule { }
