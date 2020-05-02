import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthComponent} from './auth/auth.component';
import * as fromApp from '../app/store/app.reducers';
import {ChartsModule} from 'ng2-charts';
import {StoreModule} from '@ngrx/store';
import {ReactiveFormsModule} from '@angular/forms';
import { JwtInterceptor, ErrorInterceptor } from './auth/_helpers';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ChartsModule,
        StoreModule.forRoot(fromApp.appReducers),
        ReactiveFormsModule,
        HttpClientModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
