import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthComponent} from './auth/auth.component';
import * as fromApp from '../app/store/app.reducers';
import {ChartsModule} from 'ng2-charts';
import {StoreModule} from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    StoreModule.forRoot(fromApp.appReducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
