import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizComponent} from './quiz.component';
import {UploadQuizComponent} from './upload-quiz/upload-quiz.component';
import {StudentQuizComponent} from './student-quiz/student-quiz.component';

const assignmentRoutes: Routes = [
  {
    path: '',
    component: QuizComponent,
    children: [
      {path: '', redirectTo: 'create'},
      {path: 'create', component: UploadQuizComponent},
      {path: 'students-quiz', component: StudentQuizComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(assignmentRoutes)],
  exports: [RouterModule]
})
export class QuizRoutingModule {}
