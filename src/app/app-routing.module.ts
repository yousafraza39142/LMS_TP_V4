import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {FileuploadComponent} from './fileupload/fileupload.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'file', component: FileuploadComponent },
  { path: 'main', loadChildren: () => import(`./main/main.module`).then(m => m.MainModule) },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
