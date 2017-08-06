export interface PostResponseModel {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface CommentResponseModel {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
