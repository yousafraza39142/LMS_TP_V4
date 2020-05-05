import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AssignmentRoutingModule} from './assignment-routing.module';
import {AssignmentsComponent} from './assignments.component';
import {UploadAssignmentComponent} from './upload-assignment/upload-assignment.component';
import {StudentAssignmentComponent} from './student-assignment/student-assignment.component';

@NgModule({
  declarations: [
    AssignmentsComponent,
    UploadAssignmentComponent,
    StudentAssignmentComponent
  ],
  imports: [
    RouterModule,
    AssignmentRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class AssignmentsModule {

}
