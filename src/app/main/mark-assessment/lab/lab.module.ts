import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LabRoutingModule} from './lab-routing.module';
import {LabComponent} from './lab.component';
import {UploadLabComponent} from './upload-lab/upload-lab.component';
import {StudentsLabComponent} from './students-lab/students-lab.component';

@NgModule({
  declarations: [
    LabComponent,
    UploadLabComponent,
    StudentsLabComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    LabRoutingModule,
    FormsModule
  ]
})
export class LabModule {

}
