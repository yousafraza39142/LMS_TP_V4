import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CourseComponent} from './course.component';
import {AnnouncementComponent} from './announcement/announcement.component';
import {AskQuestionComponent} from './ask-question/ask-question.component';
import {CourseMaterialComponent} from './course-material/course-material.component';
import {CourseOutlineComponent} from './course-outline/course-outline.component';
import {GradeBookComponent} from './grade-book/grade-book.component';
import {LeaveStatusComponent} from './leave-status/leave-status.component';
import {SubmitAssignmentComponent} from './submit-assignment/submit-assignment.component';
import { CourseRoutingModule } from './course-routing.module';


@NgModule({
  declarations: [
    CourseComponent,
    AnnouncementComponent,
    AskQuestionComponent,
    CourseOutlineComponent,
    CourseMaterialComponent,
    GradeBookComponent,
    LeaveStatusComponent,
    SubmitAssignmentComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
