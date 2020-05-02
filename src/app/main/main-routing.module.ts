import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main.component';
import {ComplaintsComponent} from './complaints/complaints.component';
import {ExaminationComponent} from './examination/examination.component';
import {HomeComponent} from './home/home.component';
import {PreviousCoursesComponent} from './previous-courses/previous-courses.component';
import {StudentServicesComponent} from './student-services/student-services.component';
import {TeacherAssesmentComponent} from './teacher-assesment/teacher-assesment.component';
import {TimeTableComponent} from './time-table/time-table.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {
        path: 'complaints', component: ComplaintsComponent
      },
      { path: 'course', loadChildren: () => import(`./course/course.module`).then(m => m.CourseModule) },
      {
        path: 'examination', component: ExaminationComponent
      },
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'previousCourses', component: PreviousCoursesComponent
      },
      {
        path: 'studentService', component: StudentServicesComponent
      },
      {
        path: 'teacherAssesment', component: TeacherAssesmentComponent
      },
      {
        path: 'timeTalbe', component: TimeTableComponent
      },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
