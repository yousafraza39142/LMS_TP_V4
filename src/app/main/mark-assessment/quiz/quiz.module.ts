import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {QuizRoutingModule} from './quiz-routing.module';
import {QuizComponent} from './quiz.component';
import {UploadQuizComponent} from './upload-quiz/upload-quiz.component';
import {StudentQuizComponent} from './student-quiz/student-quiz.component';

@NgModule({
  declarations: [
    QuizComponent,
    UploadQuizComponent,
    StudentQuizComponent
  ],
  imports: [
    RouterModule,
    QuizRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class QuizModule {

}
