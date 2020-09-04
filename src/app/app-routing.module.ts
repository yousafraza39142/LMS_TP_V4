import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {FileuploadComponent} from './fileupload/fileupload.component';
import {DownloadFileComponent} from './download-file/download-file.component';
import {AuthGuard} from './auth/_helpers';

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  // {path: 'file', component: FileuploadComponent},
  // {path: 'download', component: DownloadFileComponent},
  {path: 'main', canLoad: [AuthGuard], loadChildren: () => import(`./main/main.module`).then(m => m.MainModule)},
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: '**', redirectTo: 'auth'}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {enableTracing: false})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
