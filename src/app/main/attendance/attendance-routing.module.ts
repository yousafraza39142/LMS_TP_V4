import {NgModule} from '@angular/core';
import {Route, RouterModule, Routes} from '@angular/router';
import {AttendanceComponent} from './attendance.component';
import {CreateAttendanceComponent} from './create-attendance/create-attendance.component';
import {StudentAttendanceComponent} from './student-attendance/student-attendance.component';

const attendanceRouter: Routes = [
  {
    path: '',
    component: AttendanceComponent,
    children: [
      {
        path: '', redirectTo: 'create'
      },
      {
        path: 'create', component: CreateAttendanceComponent
      },
      {
        path: 'student-attendance', component: StudentAttendanceComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(attendanceRouter)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule {
}
