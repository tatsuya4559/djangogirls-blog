import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from './components/ErrorBoundary';
import PostList from './containers/PostList';
import '../../locale/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <ErrorBoundary>
    <PostList />
  </ErrorBoundary>,
  document.getElementById('posts-block'),
);
