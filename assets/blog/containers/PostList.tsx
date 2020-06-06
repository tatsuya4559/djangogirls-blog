import React, { useState, useEffect } from 'react';
// import Post from './components/Post';
import InfinitePostList from '../components/InfinitePostList';
import { fetchPosts } from '../api/post';
import { PostModel } from '../models/PostModel';
import { IndexRange } from 'react-virtualized';
import 'react-virtualized/styles.css';
import classes from './PostList.module.css';

const PostList: React.FC = () => {
  const [remoteRowCount, setRemoteRowCount] = useState(1);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [isLoading, setLoading] = useState(false);

  const loadMoreRows = ({ startIndex }: IndexRange) => {
    setLoading(true);
    return fetchPosts(startIndex).then(({ data, size }) => {
      setRemoteRowCount(size);
      setPosts((prevPosts) => prevPosts.concat(data));
      setLoading(false);
    });
  };

  return (
    <InfinitePostList
      hasNextPage={posts.length < remoteRowCount}
      isNextPageLoading={isLoading}
      posts={posts}
      loadMoreRows={loadMoreRows}
      remoteRowCount={remoteRowCount}
    />
  );
};

/* <div>
  {posts.map((post) => (
    <BootstrapCard
      key={post.pk}
      className={classes.postItem}
      post={post}
    />
  ))}
</div> */

export default PostList;
