import { RouterReducerState } from '@ngrx/router-store';
import * as responseModels from '../http-clients/xhr-response';

export interface AppState {
  routerReducer: RouterReducerState;
  header: HeaderState;
  cache: CacheState;
  post: PostState;
}

export interface PostState {
  selectedPostId: number;
}

export interface HeaderState {
  url: string;
  status: number;
}

export interface CacheState {
  postItems: PostCacheItem[];
  commentsItems: CommentsCacheItem[];
}

export interface PostCacheItem {
  postId: number;
  timestamp: string;
  data: responseModels.PostResponseModel;
}

export interface CommentsCacheItem {
  postId: number;
  timestamp: string;
  data: responseModels.CommentResponseModel[];
}
