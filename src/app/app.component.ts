import { Component, OnInit } from '@angular/core';
import { HttpClientService } from './http-clients/http-client.service';
import { Store, AppState, actions } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  post: any;
  comments: any;
  ids: string[] = [];

  constructor(
    private httpClientService: HttpClientService,
    private store: Store<AppState>,
  ) {
    this.ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => '' + value);

    this.store.select(s => s)
      .do(state => console.log('state', state))
      .subscribe(({ post, cache }) => {
        const selectedPostId: number = post.selectedPostId;
        this.post = cache.postItems.find(item => item.postId === selectedPostId);
        this.comments = cache.commentsItems.find(item => item.postId === selectedPostId);
      });
  }

  onClickPost(id: string) {
    this.store.dispatch(new actions.RequestPost({ postId: +id, timestamp: '123' }));
    // this.store.dispatch(new actions.Go({ path: ['#'], query: { a: 1 } }));
  }

  onClickComments(id: string) {
    this.store.dispatch(new actions.RequestComments({ postId: +id, timestamp: '123' }));
    // this.store.dispatch(new actions.Back());
  }

}
