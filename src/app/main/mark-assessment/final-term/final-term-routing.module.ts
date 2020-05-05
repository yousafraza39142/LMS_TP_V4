import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FinalTermComponent} from './final-term.component';
import {CreateFinalTermComponent} from './create-final-term/create-final-term.component';
import {StudentsFinalTermComponent} from './students-final-term/students-final-term.component';

const finalTermRoutes: Routes = [
  {
    path: '',
    component: FinalTermComponent,
    children: [
      {path: '', redirectTo: 'create'},
      {path: 'create', component: CreateFinalTermComponent},
      {path: 'students-final-term', component: StudentsFinalTermComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(finalTermRoutes)],
  exports: [RouterModule]
})
export class FinalTermRoutingModule {}
