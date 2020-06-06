import React, { ReactNode } from 'react';
import {
  InfiniteLoader,
  List,
  Index,
  IndexRange,
  ListRowRenderer,
  AutoSizer,
} from 'react-virtualized';
import BootstrapCard from './BootstrapCard';
import { PostModel } from '../models/PostModel';
import classes from './InfinitePostList.module.css';

type Props = {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  posts: PostModel[];
  loadMoreRows: (params: IndexRange) => Promise<any>;
  remoteRowCount: number;
};

const InfinitePostList: React.FC<Props> = ({
  hasNextPage,
  isNextPageLoading,
  posts,
  loadMoreRows,
  remoteRowCount,
}) => {
  const isRowLoaded = ({ index }: Index) =>
    !hasNextPage || index < posts.length;
  const rowCount =
    !isNextPageLoading && hasNextPage ? posts.length + 1 : posts.length;

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    let content: ReactNode;
    if (isRowLoaded({ index })) {
      // 単純なListだとスクロールするブロックができる
      //画面全体を無限スクロールするにはwindowscrollerを使用する
      content = <BootstrapCard post={posts[index]} />;
    } else {
      content = 'Loading...';
    }

    return (
      <div key={key} style={style}>
        {content}
      </div>
    );
  };

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
    >
      {({ onRowsRendered, registerChild }) => (
        <List
          ref={registerChild}
          onRowsRendered={onRowsRendered}
          rowRenderer={rowRenderer}
          height={800}
          rowHeight={240}
          width={640}
          rowCount={rowCount}
        />
      )}
    </InfiniteLoader>
  );
};

export default InfinitePostList;
