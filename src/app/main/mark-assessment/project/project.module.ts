import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProjectComponent} from './project.component';
import {UploadProjectComponent} from './upload-project/upload-project.component';
import {StudentProjectsComponent} from './student-projects/student-projects.component';
import {ProjectRoutingModule} from './project-routing.module';

@NgModule({
  declarations: [
    ProjectComponent,
    UploadProjectComponent,
    StudentProjectsComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ProjectRoutingModule,
    FormsModule
  ]
})
export class ProjectModule {

}
