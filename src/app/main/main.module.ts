import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MainComponent} from './main.component';
import {AlertComponent} from './alert/alert.component';
import {MainRoutingModule} from './main-routing.module';
import {AutoCloseDirective} from './auto.close.directive';
import {AppComponentEventEmitterService} from './event-emmiter.service';
import {ChartsModule} from 'ng2-charts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ViewStudentProfileComponent} from './view-student-profile/view-student-profile.component';
import {CourseUploadComponent} from './course-upload/course-upload.component';
import {TimeTableComponent} from './time-table/time-table.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { AssessmentWeightageComponent } from './assessment-weightage/assessment-weightage.component';



@NgModule({
  declarations: [
    MainComponent,
    AlertComponent,
    ViewStudentProfileComponent,
    CourseUploadComponent,
    TimeTableComponent,
    AutoCloseDirective,
    ChangePasswordComponent,
    MessageModalComponent,
    AssessmentWeightageComponent
  ],
    imports: [
        CommonModule,
        MainRoutingModule,
        ChartsModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [AppComponentEventEmitterService]
})
export class MainModule { }
