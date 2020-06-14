import React, { useState, useEffect } from 'react';
import InfinitePostList from '../components/InfinitePostList';
import InfinitePostListWindow from '../components/InfinitePostListWindow';
import { fetchPosts } from '../api/post';
import { PostModel } from '../models/PostModel/PostModel';
import { IndexRange } from 'react-virtualized';
import 'react-virtualized/styles.css';
import Tooltip from '../components/common/Tooltip/Tooltip';
import Accordion from '../components/common/Accordion/Accordion';
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
      <Tooltip
        text="tootip"
        placement="top"
        className="bg-gray-600 border-gray-600 text-blue-100"
      >
        <button className={styles.btn}>tailwind</button>
      </Tooltip>

      <hr />

      <div className="w-1/2">
        <Accordion>
          <Accordion.Header defaultOpen className="bg-gray-600 text-white p-2">
            クリックで開く1
          </Accordion.Header>
          <Accordion.Content className="border border-black border-solid px-2">
            <p className="p-2">hello.world!</p>
            <p className="p-2">hello.world!</p>
            <p className="p-2">hello.world!</p>
            <p className="p-2">hello.world!</p>
            <p className="p-2">hello.world!</p>
            <p className="p-2">hello.world!</p>
            <p className="p-2">hello.world!</p>
            <p className="p-2">hello.world!</p>
          </Accordion.Content>
          <Accordion.Header className="bg-gray-600 text-white p-2">
            クリックで開く2
          </Accordion.Header>
          <Accordion.Content className="border border-black border-solid px-2">
            <p className="p-2">hello.world2!</p>
            <p className="p-2">hello.world2!</p>
            <p className="p-2">hello.world2!</p>
            <p className="p-2">hello.world2!</p>
          </Accordion.Content>
          <Accordion.Header className="bg-gray-600 text-white p-2">
            クリックで開く3
          </Accordion.Header>
          <Accordion.Content className="border border-black border-solid px-2">
            <p className="p-2">hello.world3!</p>
            <p className="p-2">hello.world3!</p>
          </Accordion.Content>
        </Accordion>
      </div>

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
