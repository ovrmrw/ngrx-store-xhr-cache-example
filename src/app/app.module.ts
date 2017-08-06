import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';


import { AppComponent } from './app.component';
import { HttpClientService } from './http-clients/http-client.service';
import { REDUCER_TOKEN, getRootReducer, initialState } from './store/store';
import { StoreEffects } from './store/effects';
import { RouterEffects } from './store/router-effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot(REDUCER_TOKEN, {
      initialState,
    }),
    EffectsModule.forRoot([
      StoreEffects,
      RouterEffects,
    ]),
    StoreRouterConnectingModule,
  ],
  providers: [
    HttpClientService,
    { provide: REDUCER_TOKEN, useFactory: getRootReducer },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
