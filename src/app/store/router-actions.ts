import { Action } from '@ngrx/store';
import { NavigationExtras, Params } from '@angular/router';

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';

export class Go implements Action {
  readonly type = GO;
  constructor(public payload: {
    path: any[];
    query?: Params;
    extras?: NavigationExtras;
  }) { }
}

export class Back implements Action {
  readonly type = BACK;
}

export class Forward implements Action {
  readonly type = FORWARD;
}
