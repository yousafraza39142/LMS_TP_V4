import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AttendanceRoutingModule} from './attendance-routing.module';
import {AttendanceComponent} from './attendance.component';
import {CreateAttendanceComponent} from './create-attendance/create-attendance.component';
import {StudentAttendanceComponent} from './student-attendance/student-attendance.component';

@NgModule({
  declarations: [
    AttendanceComponent,
    CreateAttendanceComponent,
    StudentAttendanceComponent
  ],
  imports: [
    RouterModule,
    AttendanceRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class AttendanceModule {
}
