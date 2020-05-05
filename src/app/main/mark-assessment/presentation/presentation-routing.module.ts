import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PresentationComponent} from './presentation.component';
import {CreatePresentationComponent} from './create-presentation/create-presentation.component';
import {StudentsPresentationComponent} from './students-presentation/students-presentation.component';

const presentationRoutes: Routes = [
  {
    path: '',
    component: PresentationComponent,
    children: [
      {path: '', redirectTo: 'create'},
      {path: 'create', component: CreatePresentationComponent},
      {path: 'students-presentation', component: StudentsPresentationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(presentationRoutes)],
  exports: [RouterModule]
})
export class PresentationRoutingModule {
}
