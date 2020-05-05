import {NgModule} from '@angular/core';
import {TeacherInformationComponent} from './teacher-information.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [TeacherInformationComponent],
  imports: [
    RouterModule.forChild([{path: '', component: TeacherInformationComponent}])
  ]
})
export class TeacherInformationModule {

}
