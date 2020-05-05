import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main.component';
import {TimeTableComponent} from './time-table/time-table.component';
import {CourseUploadComponent} from './course-upload/course-upload.component';
import {ViewStudentProfileComponent} from './view-student-profile/view-student-profile.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'attendance', loadChildren: () => import(`./attendance/attendance.module`).then(m => m.AttendanceModule) },
      { path: 'assignment', loadChildren: () => import(`./mark-assessment/assignments/assignments.module`).then(m => m.AssignmentsModule) },
      { path: 'finalTerm', loadChildren: () => import(`./mark-assessment/final-term/final-term.module`).then(m => m.FinalTermModule) },
      { path: 'lab', loadChildren: () => import(`./mark-assessment/lab/lab.module`).then(m => m.LabModule) },
      { path: 'midTerm', loadChildren: () => import(`./mark-assessment/mid-term/mid-term.module`).then(m => m.MidTermModule) },
      { path: 'project', loadChildren: () => import(`./mark-assessment/project/project.module`).then(m => m.ProjectModule) },
      { path: 'studentQueries', loadChildren: () => import(`./student-queries/student-queries.module`).then(m => m.StudentQueriesModule) },
      // tslint:disable-next-line:max-line-length
      { path: 'teacherInformation', loadChildren: () => import(`./teacher-information/teacher-information.module`).then(m => m.TeacherInformationModule) },
      { path: 'timeTable', component: TimeTableComponent },
      { path: 'courseUpload', component: CourseUploadComponent },
      { path: 'viewStudentProfile', component: ViewStudentProfileComponent },
      { path: '', redirectTo: 'timeTable', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
