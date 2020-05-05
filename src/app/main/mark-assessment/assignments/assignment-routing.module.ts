import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssignmentsComponent} from './assignments.component';
import {UploadAssignmentComponent} from './upload-assignment/upload-assignment.component';
import {StudentAssignmentComponent} from './student-assignment/student-assignment.component';

const assignmentRoutes: Routes = [
  {
    path: '',
    component: AssignmentsComponent,
    children: [
      {path: '', redirectTo: 'upload'},
      {path: 'upload', component: UploadAssignmentComponent},
      {path: 'students-assignments', component: StudentAssignmentComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(assignmentRoutes)],
  exports: [RouterModule]
})
export class AssignmentRoutingModule {}
