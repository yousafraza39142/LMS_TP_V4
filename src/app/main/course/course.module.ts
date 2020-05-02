import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CourseComponent} from './course.component';
import {AnnoucementComponent} from './annoucement/annoucement.component';
import {AskQuestionComponent} from './ask-question/ask-question.component';
import {CourseMaterialComponent} from './course-material/course-material.component';
import {CourseOutlineComponent} from './course-outline/course-outline.component';
import {GradeBookComponent} from './grade-book/grade-book.component';
import {LeaveStatusComponent} from './leave-status/leave-status.component';
import {SubmitAssignmentComponent} from './submit-assignment/submit-assignment.component';
import { CourseRoutingModule } from './course-routing.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    CourseComponent,
    AnnoucementComponent,
    AskQuestionComponent,
    CourseOutlineComponent,
    CourseMaterialComponent,
    GradeBookComponent,
    LeaveStatusComponent,
    SubmitAssignmentComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    FormsModule
  ]
})
export class CourseModule { }
