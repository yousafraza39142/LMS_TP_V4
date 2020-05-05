import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LabComponent} from './lab.component';
import {UploadLabComponent} from './upload-lab/upload-lab.component';
import {StudentsLabComponent} from './students-lab/students-lab.component';

const labRoutes: Routes = [
  {
    path: '',
    component: LabComponent,
    children: [
      {path: '', redirectTo: 'upload'},
      {path: 'upload', component: UploadLabComponent},
      {path: 'students-lab', component: StudentsLabComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(labRoutes)],
  exports: [RouterModule]
})
export class LabRoutingModule {}
