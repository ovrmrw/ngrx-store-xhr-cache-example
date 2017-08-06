import { Action } from '@ngrx/store';
import * as responseModels from '../http-clients/xhr-response';
import { Go, Back, Forward } from './router-actions';
export { Go, Back, Forward };

export const REQUEST_POST = 'request post';
export const UPDATE_POST = 'update post';
export const REQUEST_COMMENTS = 'request comments';
export const UPDATE_COMMENTS = 'update comments';
export const UPDATE_HEADER = 'update header';
export const LOAD_POST_CACHE = 'load post cache';
export const LOAD_COMMENTS_CACHE = 'load comments cache';
export const UPDATE_SELECTED_POSTID = 'update selected postId';
export const XHR_ACTION_FAILED = 'XMLHttpRequest action failed';
export const SOME_ACTION_FAILED = 'some action failed';

export class RequestPost implements Action {
  readonly type = REQUEST_POST;
  constructor(public payload: { postId: number, timestamp: string }) { }
}

export class UpdatePost implements Action {
  readonly type = UPDATE_POST;
  constructor(public payload: { postId: number, data: responseModels.PostResponseModel }) { }
}

export class RequestComments implements Action {
  readonly type = REQUEST_COMMENTS;
  constructor(public payload: { postId: number, timestamp: string }) { }
}

export class UpdateComments implements Action {
  readonly type = UPDATE_COMMENTS;
  constructor(public payload: { postId: number, data: responseModels.CommentResponseModel[] }) { }
}

export class UpdateHeader implements Action {
  readonly type = UPDATE_HEADER;
  constructor(public payload: { url: string, status: number }) { }
}

export class LoadPostCache implements Action {
  readonly type = LOAD_POST_CACHE;
  constructor(public payload: { postId: number }) { }
}

export class LoadCommentsCache implements Action {
  readonly type = LOAD_POST_CACHE;
  constructor(public payload: { postId: number }) { }
}

export class UpdateSelectedPostId implements Action {
  readonly type = UPDATE_SELECTED_POSTID;
  constructor(public payload: { selectedPostId: number }) { }
}

export class XhrActionFailed implements Action {
  readonly type = XHR_ACTION_FAILED;
}

export class SomeActionFailed implements Action {
  readonly type = SOME_ACTION_FAILED;
}

export type All
  = Go | Back | Forward
  | UpdateHeader
  | RequestPost | UpdatePost
  | RequestComments | UpdateComments
  | LoadPostCache | LoadCommentsCache
  | UpdateSelectedPostId
  | XhrActionFailed | SomeActionFailed
  ;
