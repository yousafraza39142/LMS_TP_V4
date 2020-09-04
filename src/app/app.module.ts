import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import * as fromApp from '../app/store/app.reducers';
import {ChartsModule} from 'ng2-charts';
import {StoreModule} from '@ngrx/store';
import {ReactiveFormsModule} from '@angular/forms';
import {JwtInterceptor, ErrorInterceptor, AuthGuard} from './auth/_helpers';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FileuploadComponent} from './fileupload/fileupload.component';
import {DownloadFileComponent} from './download-file/download-file.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    FileuploadComponent,
    DownloadFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    StoreModule.forRoot(fromApp.appReducers),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
