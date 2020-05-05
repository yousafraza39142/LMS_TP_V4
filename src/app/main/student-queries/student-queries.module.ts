import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {StudentQueriesRoutingModule} from './student-queries-routing.module';
import {StudentQueriesComponent} from './student-queries.component';
import { QueriesComponent } from './queries/queries.component';
import { AnswerQueriesComponent } from './answer-queries/answer-queries.component';

@NgModule({
  declarations: [
      StudentQueriesComponent,
      QueriesComponent,
      AnswerQueriesComponent
  ],
  imports: [
    RouterModule,
    StudentQueriesRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class StudentQueriesModule {

}
