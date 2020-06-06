import axios from 'axios';
import { PostModel } from '../models/PostModel';

export interface FetchPostsResponse {
  pk: number;
  title: string;
  text: string;
  published_date: string;
}

export async function fetchPosts() {
  const res = await axios.get<{ posts: FetchPostsResponse[] }>('/api/posts');
  return res.data.posts.map((post) => new PostModel(post));
}
