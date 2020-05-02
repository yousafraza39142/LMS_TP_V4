import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CourseComponent} from './course.component';
import {AnnoucementComponent} from './annoucement/annoucement.component';
import {AskQuestionComponent} from './ask-question/ask-question.component';
import {CourseMaterialComponent} from './course-material/course-material.component';
import {CourseOutlineComponent} from './course-outline/course-outline.component';
import {GradeBookComponent} from './grade-book/grade-book.component';
import {LeaveStatusComponent} from './leave-status/leave-status.component';
import {SubmitAssignmentComponent} from './submit-assignment/submit-assignment.component';

const routes: Routes = [
  {
    path: '', component: CourseComponent, children: [

      {
        path: 'annoucement', component: AnnoucementComponent
      },
      {
        path: 'askQuestion', component: AskQuestionComponent
      },
      {
        path: 'courseMaterial', component: CourseMaterialComponent
      },
      {
        path: 'courseOutline', component: CourseOutlineComponent
      },
      {
        path: 'gradeBook', component: GradeBookComponent
      },
      {
        path: 'leaveStatus', component: LeaveStatusComponent
      },
      {
        path: 'submitAssignment', component: SubmitAssignmentComponent
      },
      {
        path: '', redirectTo: 'annoucement', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
