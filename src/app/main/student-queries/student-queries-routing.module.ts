import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {StudentQueriesComponent} from './student-queries.component';
import {QueriesComponent} from './queries/queries.component';
import {AnswerQueriesComponent} from './answer-queries/answer-queries.component';

const studentQueriesRoutes: Routes = [
  {
    path: '',
    component: StudentQueriesComponent,
    children: [
      {path: '', component: QueriesComponent},
      {path: 'queries', component: QueriesComponent},
      {path: 'answerQueries', component: AnswerQueriesComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(studentQueriesRoutes)],
  exports: [RouterModule]
})
export class StudentQueriesRoutingModule {}
