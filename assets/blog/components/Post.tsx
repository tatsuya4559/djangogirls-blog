import React from 'react';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import classes from './Post.module.css';
import { FetchPostsResponse } from '../api/post';

type Props = {
  post: FetchPostsResponse;
};

const Post: React.FC<Props> = ({ post }) => {
  return (
    <div className={classes.post}>
      <div className={classes.date}>
        <p>published: {format(parseISO(post.published_date), 'yyyy/MM/dd')}</p>
      </div>
      <h2>
        <a href={`/post/${post.id}`}>{post.title}</a>
      </h2>
      <p>{post.text}</p>
      {/* <a href="{% url 'post_detail' pk=post.pk %}">Comments: { post.approved_comments.count }</a> */}
    </div>
  );
};

export default Post;
