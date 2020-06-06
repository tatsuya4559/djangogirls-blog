import React from 'react';
import Card from 'react-bootstrap/Card';
import cx from 'classnames';
import { PostModel } from '../models/PostModel';
import classes from './BootstrapCard.module.css';

type Props = {
  post: PostModel;
};

const BootstrapCard: React.FC<Props> = ({ post }) => {
  console.log(classes.date);

  return (
    <Card className={classes.card}>
      <Card.Body>
        <Card.Title>
          <a href={`/post/${post.pk}`}>{post.title}</a>
        </Card.Title>
        <Card.Subtitle className={classes.date}>
          <span className="text-muted">{post.published_date_yyyymmdd}</span>
        </Card.Subtitle>
        <Card.Text>{post.text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BootstrapCard;
