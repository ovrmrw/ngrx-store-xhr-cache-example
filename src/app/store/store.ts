import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import * as reducers from './reducers';
import { AppState } from './models';

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('Registered Reducers');

export function getRootReducer() {
  return rootReducer;
}

export const rootReducer: ActionReducerMap<AppState> = {
  routerReducer,
  header: reducers.headerStateReducer,
  cache: reducers.cacheStateReducer,
  post: reducers.postStateReducer,
};

export const initialState: AppState = {
  routerReducer: undefined,
  header: {
    status: 0,
    url: '',
  },
  cache: {
    postItems: [],
    commentsItems: [],
  },
  post: {
    selectedPostId: 0,
  }
};
