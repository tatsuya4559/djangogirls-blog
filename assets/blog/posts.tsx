import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from './components/ErrorBoundary';
import PostList from './containers/PostList';
import '../../locale/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from '@chakra-ui/core';

ReactDOM.render(
  <ErrorBoundary>
    <ThemeProvider>
      <PostList />
    </ThemeProvider>
  </ErrorBoundary>,
  document.getElementById('posts-block'),
);
