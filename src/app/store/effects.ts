import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import * as actions from './actions';
import * as routerActions from './router-actions';
import { AppState } from './models';
import { HttpClientService } from '../http-clients/http-client.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class StoreEffects {

  constructor(
    private effectsActions$: Actions,
    private httpClientService: HttpClientService,
    private store: Store<AppState>,
  ) { }

  @Effect()
  updatePost$: Observable<Action> = this.effectsActions$
    .ofType(actions.REQUEST_POST)
    .map(action => action as actions.RequestPost)
    .withLatestFrom(this.store.select(s => s.cache.postItems))
    .switchMap(([action, cachePostItems]) => {
      const postId: number = action.payload.postId;
      const timestamp: string = action.payload.timestamp;
      if (cachePostItems.some(item => item.postId === postId && item.timestamp === timestamp)) {
        return Observable.of(new actions.LoadPostCache({ postId }) as Action);
      } else {
        return this.httpClientService
          .getPost(postId)
          .map(post => new actions.UpdatePost({ postId, data: post }) as Action);
      }
    })
    .let(observable => this.actionErrorHandler(observable));

  @Effect()
  updateComments$: Observable<Action> = this.effectsActions$
    .ofType(actions.REQUEST_COMMENTS)
    .map(action => action as actions.RequestComments)
    .withLatestFrom(this.store.select(s => s.cache.commentsItems))
    .switchMap(([action, cacheCommentsItems]) => {
      const postId: number = action.payload.postId;
      const timestamp: string = action.payload.timestamp;
      if (cacheCommentsItems.some(item => item.postId === postId && item.timestamp === timestamp)) {
        return Observable.of(new actions.LoadPostCache({ postId }) as Action);
      } else {
        return this.httpClientService
          .getComments(postId)
          .map(comments => new actions.UpdateComments({ postId, data: comments }) as Action);
      }
    })
    .let(observable => this.actionErrorHandler(observable));

  @Effect()
  updateSelectedPostId$: Observable<Action> = this.effectsActions$
    .ofType(actions.REQUEST_POST, actions.REQUEST_COMMENTS)
    .map(action => action as actions.RequestPost | actions.RequestComments)
    .map(action => {
      const selectedPostId: number = action.payload.postId;
      return new actions.UpdateSelectedPostId({ selectedPostId });
    });

  actionErrorHandler(observable: Observable<Action>): Observable<Action> {
    return observable
      .catch(err => {
        console.error(err);
        if (err instanceof HttpErrorResponse) {
          return Observable.of(new actions.XhrActionFailed() as Action);
        } else {
          return Observable.of(new actions.SomeActionFailed() as Action);
        }
      });
  }

}
