import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'semantic-ui-react';
import BSButton from 'react-bootstrap/Button';
import classes from './Post.module.css';
import { PostModel } from '../models/PostModel';

type Props = {
  post: PostModel;
};

const Post: React.FC<Props> = ({ post }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={classes.post}>
      <div className={classes.date}>
        <p>published: {post.published_date_yyyymmdd}</p>
      </div>
      <p>{t('タイトルですた')}</p>
      <Button primary onClick={() => changeLanguage('ja')}>
        ja
      </Button>
      <BSButton variant="primary" onClick={() => changeLanguage('en')}>
        en
      </BSButton>
      <h2>
        <a href={`/post/${post.pk}`}>{post.title}</a>
      </h2>
      <p>{post.text}</p>
      {/* <a href="{% url 'post_detail' pk=post.pk %}">Comments: { post.approved_comments.count }</a> */}
    </div>
  );
};

export default Post;
