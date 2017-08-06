import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import * as apiEndpoints from './api-endpoints';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { PostResponseModel, CommentResponseModel } from './xhr-response';
import { Store, AppState, actions } from '../store';

@Injectable()
export class HttpClientService {

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>,
  ) { }

  getPost(postId: number): Observable<PostResponseModel> {
    const endpoint = apiEndpoints.getPostEndpointByPostId(postId);
    return this.httpClient
      .get<PostResponseModel>(endpoint, {
        observe: 'response'
      })
      .let(observable => this.httpClientResponseHandler(observable));
  }

  getComments(postId: number): Observable<CommentResponseModel[]> {
    const endpoint = apiEndpoints.getCommentsEndpointByPostId(postId);
    return this.httpClient
      .get<CommentResponseModel[]>(endpoint, {
        observe: 'response'
      })
      .let(observable => this.httpClientResponseHandler(observable));
  }

  httpClientResponseHandler<T>(observable: Observable<HttpResponse<T>>): Observable<T> {
    return observable
      .catch((err: HttpErrorResponse, caught) => {
        if (err) {
          throw err;
        } else {
          return caught;
        }
      })
      .do(res => {
        this.store.dispatch(new actions.UpdateHeader({
          url: res.url,
          status: res.status,
        }));
      })
      .map(res => res.body);
  }

}
