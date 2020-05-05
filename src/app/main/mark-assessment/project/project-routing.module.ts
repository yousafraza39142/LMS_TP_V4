import {ProjectComponent} from './project.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadProjectComponent} from './upload-project/upload-project.component';
import {StudentProjectsComponent} from './student-projects/student-projects.component';

const projectRoutes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      {path: '', redirectTo: 'upload'},
      {path: 'upload', component: UploadProjectComponent},
      {path: 'students-project', component: StudentProjectsComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(projectRoutes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
