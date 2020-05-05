import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PresentationComponent} from './presentation.component';
import {CreatePresentationComponent} from './create-presentation/create-presentation.component';
import {StudentsPresentationComponent} from './students-presentation/students-presentation.component';
import {PresentationRoutingModule} from './presentation-routing.module';

@NgModule({
  declarations: [
    PresentationComponent,
    CreatePresentationComponent,
    StudentsPresentationComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    PresentationRoutingModule,
    FormsModule
  ]
})
export class PresentationModule {

}
