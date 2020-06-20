import React, { useState } from 'react';
import InfinitePostListWindow from '../components/InfinitePostListWindow/InfinitePostListWindow';
import { fetchPosts } from '../api/post';
import { PostModel } from '../models/PostModel/PostModel';
import { IndexRange } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from './PostList.module.css';

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
    <>
      <InfinitePostListWindow
        hasNextPage={posts.length < remoteRowCount}
        isNextPageLoading={isLoading}
        posts={posts}
        loadMoreRows={loadMoreRows}
      />
    </>
  );
};

export default PostList;
