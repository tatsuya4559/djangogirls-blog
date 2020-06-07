import React, { ReactNode } from 'react';
import {
  InfiniteLoader,
  WindowScroller,
  List,
  Index,
  IndexRange,
  ListRowRenderer,
  AutoSizer,
} from 'react-virtualized';
import remToPx from '../lib/remToPx';
import BootstrapCard from './BootstrapCard';
import { PostModel } from '../models/PostModel';
import classes from './InfinitePostListWindow.module.css';

type Props = {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  posts: PostModel[];
  loadMoreRows: (params: IndexRange) => Promise<any>;
  remoteRowCount: number;
};

const InfinitePostListWindow: React.FC<Props> = ({
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
      <div key={key} style={style} className={classes.row}>
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
        <WindowScroller>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <List
              autoHeight
              ref={registerChild}
              onRowsRendered={onRowsRendered}
              rowRenderer={rowRenderer}
              height={height}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              scrollTop={scrollTop}
              rowHeight={remToPx(15 + 2)} // カードのheight + margin
              width={remToPx(40 + 2)} // カードのwidth + margin(margin取らないとbox-shadowが見切れる)
              rowCount={rowCount}
            />
          )}
        </WindowScroller>
      )}
    </InfiniteLoader>
  );
};

export default InfinitePostListWindow;
