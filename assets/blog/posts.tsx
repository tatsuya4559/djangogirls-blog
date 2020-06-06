import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Post from './components/Post';
import BootstrapCard from './components/BootstrapCard';
import { fetchPosts } from './api/post';
import { PostModel } from './models/PostModel';
import '../../locale/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  useEffect(() => {
    fetchPosts().then((data) => setPosts(data));
  }, []);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.pk} post={post} />
      ))}
      {posts.map((post) => (
        <BootstrapCard key={post.pk} post={post} />
      ))}
    </>
  );
};

ReactDOM.render(<PostList />, document.getElementById('posts-block'));
