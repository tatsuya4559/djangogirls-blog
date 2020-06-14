import React from 'react';
import cx from 'classnames';
import { PostModel } from '../models/PostModel/PostModel';
import classes from './BootstrapCard.module.css';

type Props = {
  post: PostModel;
  className?: string;
};

const BootstrapCard: React.FC<Props> = ({ post, className }) => {
  return (
    <div className={cx(classes.card, className)}>
      <div>
        <div>
          <a href={`/post/${post.pk}`}>{post.title}</a>
        </div>
        <div className={classes.date}>
          <span className="text-muted">{post.published_date_yyyymmdd}</span>
        </div>
        <div className={classes.text}>{post.text}</div>
      </div>
    </div>
  );
};

export default BootstrapCard;
