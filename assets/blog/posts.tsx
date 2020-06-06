import React from 'react';
import ReactDOM from 'react-dom';
import PostList from './containers/PostList';
import '../../locale/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<PostList />, document.getElementById('posts-block'));
