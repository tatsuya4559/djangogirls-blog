import React from 'react';
import cx from 'classnames';
import { PostModel } from '../../models/PostModel/PostModel';
import styles from './Post.module.css';

type Props = {
  post: PostModel;
  className?: string;
};

const Post: React.FC<Props> = ({ post, className }) => {
  return (
    <div className={cx(styles.card, className)}>
      <h3>
        <a
          href={`/post/${post.pk}`}
          className="font-bold text-black hover:text-blue-700"
        >
          {post.title}
        </a>
      </h3>
      <p className="text-sm text-gray-700 mb-4">
        {post.published_date_yyyymmdd}
      </p>
      <p className="text-gray-700">{post.text}</p>
    </div>
  );
};

export default Post;
