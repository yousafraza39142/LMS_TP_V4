import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FinalTermRoutingModule} from './final-term-routing.module';
import {FinalTermComponent} from './final-term.component';
import {CreateFinalTermComponent} from './create-final-term/create-final-term.component';
import {StudentsFinalTermComponent} from './students-final-term/students-final-term.component';

@NgModule({
  declarations: [
    FinalTermComponent,
    CreateFinalTermComponent,
    StudentsFinalTermComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FinalTermRoutingModule,
    FormsModule
  ]
})
export class FinalTermModule {

}
