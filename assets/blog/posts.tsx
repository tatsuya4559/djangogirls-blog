import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Post from './components/Post';
import { FetchPostsResponse, fetchPosts } from './api/post';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<FetchPostsResponse[]>([]);
  useEffect(() => {
    fetchPosts().then((data) => setPosts(data));
  }, []);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

ReactDOM.render(<PostList />, document.getElementById('posts-block'));
