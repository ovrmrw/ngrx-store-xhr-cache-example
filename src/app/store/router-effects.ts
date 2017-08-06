import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions } from '@ngrx/effects';
import * as routerActions from './router-actions';

@Injectable()
export class RouterEffects {

  constructor(
    private effectsActions$: Actions,
    private router: Router,
    private location: Location,
  ) { }

  @Effect({ dispatch: false })
  navigate$: Observable<any> = this.effectsActions$
    .ofType(routerActions.GO)
    .map(action => action as routerActions.Go)
    .map(action => action.payload)
    .do(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    });

  @Effect({ dispatch: false })
  navigateBack$: Observable<any> = this.effectsActions$
    .ofType(routerActions.BACK)
    .do(() => {
      this.location.back();
    });

  @Effect({ dispatch: false })
  navigateForward$: Observable<any> = this.effectsActions$
    .ofType(routerActions.FORWARD)
    .do(() => {
      this.location.forward();
    });

}
