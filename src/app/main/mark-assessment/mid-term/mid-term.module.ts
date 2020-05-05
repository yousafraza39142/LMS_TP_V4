import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MidTermRoutingModule} from './mid-term-routing.module';
import {MidTermComponent} from './mid-term.component';
import {CreateMidTermComponent} from './create-mid-term/create-mid-term.component';
import {StudentsMidTermComponent} from './students-mid-term/students-mid-term.component';

@NgModule({
  declarations: [
    MidTermComponent,
    CreateMidTermComponent,
    StudentsMidTermComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MidTermRoutingModule,
    FormsModule
  ]
})
export class MidTermModule {

}
