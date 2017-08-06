// tslint:disable:max-line-length
import { ActionReducer } from '@ngrx/store';
import * as actions from './actions';
import { AppState, HeaderState, PostState, CacheState } from './models';

export const headerStateReducer: ActionReducer<HeaderState, actions.All> =
  (state, action) => {
    switch (action.type) {
      case actions.UPDATE_HEADER:
        return {
          ...state,
          url: action.payload.url,
          status: action.payload.status,
        };
      default:
        return state;
    }
  };

export const postStateReducer: ActionReducer<PostState, actions.All> =
  (state, action) => {
    switch (action.type) {
      case actions.UPDATE_SELECTED_POSTID:
        return {
          ...state,
          selectedPostId: action.payload.selectedPostId,
        };
      default:
        return state;
    }
  };

export const cacheStateReducer: ActionReducer<CacheState, actions.All> =
  (state, action) => {
    switch (action.type) {
      case actions.UPDATE_POST:
        return {
          ...state,
          postItems: [...state.postItems, {
            postId: action.payload.postId,
            timestamp: '123',
            data: action.payload.data,
          }]
        };
      case actions.UPDATE_COMMENTS:
        if (action.payload.data.length > 0) {
          return {
            ...state,
            commentsItems: [...state.commentsItems, {
              postId: action.payload.postId,
              timestamp: '123',
              data: action.payload.data,
            }]
          };
        } else {
          return state;
        }
      default:
        return state;
    }
  };
