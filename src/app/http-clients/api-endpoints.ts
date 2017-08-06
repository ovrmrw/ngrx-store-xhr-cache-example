const host = 'https://jsonplaceholder.typicode.com';

export function getPostEndpointByPostId(postId: number): string {
  return `${host}/posts/${postId}`;
}

export function getCommentsEndpointByPostId(postId: number): string {
  return `${host}/posts/${postId}/comments`;
}
