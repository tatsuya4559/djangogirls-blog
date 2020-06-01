import axios from 'axios';

export type FetchPostsResponse = {
  id: number;
  title: string;
  text: string;
  published_date: string;
};

export async function fetchPosts() {
  const res = await axios.get<{ posts: FetchPostsResponse[] }>('/api/posts');
  return res.data.posts;
}
