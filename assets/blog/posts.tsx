import React from 'react';
import { render } from 'react-dom';
import ErrorBoundary from './components/ErrorBoundary';
import PostList from './containers/PostList';
import '../../locale/i18n';
import './tailwind.pcss';

render(
  <ErrorBoundary>
    <PostList />
  </ErrorBoundary>,
  document.getElementById('posts-block'),
);
