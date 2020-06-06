import React, { useState, useEffect } from 'react';
// import Post from './components/Post';
import BootstrapCard from '../components/BootstrapCard';
import { fetchPosts } from '../api/post';
import { PostModel } from '../models/PostModel';
import classes from './PostList.module.css';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    fetchPosts().then((data) => setPosts(data));
  }, []);

  return (
    <>
      <div className={classes.postContainer}>
        {posts.map((post) => (
          <BootstrapCard
            key={post.pk}
            className={classes.postItem}
            post={post}
          />
        ))}
      </div>
    </>
  );
};

export default PostList;
