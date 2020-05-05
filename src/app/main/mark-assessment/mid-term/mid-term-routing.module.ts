import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MidTermComponent} from './mid-term.component';
import {CreateMidTermComponent} from './create-mid-term/create-mid-term.component';
import {StudentsMidTermComponent} from './students-mid-term/students-mid-term.component';

const midtermRoutes: Routes = [
  {
    path: '',
    component: MidTermComponent,
    children: [
      {path: '', redirectTo: 'create'},
      {path: 'create', component: CreateMidTermComponent},
      {path: 'students-mid-term', component: StudentsMidTermComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(midtermRoutes)],
  exports: [RouterModule]
})
export class MidTermRoutingModule {}
