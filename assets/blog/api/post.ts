import axios from 'axios';
import { PostModel } from '../models/PostModel/PostModel';

interface FetchPostsResponse {
  posts: {
    pk: number;
    title: string;
    text: string;
    published_date: string;
  }[];
  total: number;
}

export async function fetchPosts(startIndex: number = 0, size: number = 20) {
  const res = await axios.get<FetchPostsResponse>('/api/posts', {
    params: {
      start_index: startIndex,
      size: size,
    },
  });
  return {
    data: res.data.posts.map((post) => new PostModel(post)),
    size: res.data.total,
  };
}
