import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MainComponent} from './main.component';
import {AlertComponent} from './alert/alert.component';
import {MainRoutingModule} from './main-routing.module';
import {AutoCloseDirective} from './auto.close.directive';
import {AppComponentEventEmitterService} from './event-emmiter.service';
import {ChartsModule} from 'ng2-charts';
import {FormsModule} from '@angular/forms';
import {ViewStudentProfileComponent} from './view-student-profile/view-student-profile.component';
import {CourseUploadComponent} from './course-upload/course-upload.component';
import {TimeTableComponent} from './time-table/time-table.component';



@NgModule({
  declarations: [
    MainComponent,
    AlertComponent,
    ViewStudentProfileComponent,
    CourseUploadComponent,
    TimeTableComponent,
    AutoCloseDirective
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ChartsModule,
    FormsModule
  ],
  providers: [AppComponentEventEmitterService]
})
export class MainModule { }
