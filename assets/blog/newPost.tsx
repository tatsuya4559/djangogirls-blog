import React, { useState } from 'react';
import { render } from 'react-dom';
import ErrorBoundary from './components/ErrorBoundary';
import '../../locale/i18n';
import './tailwind.pcss';
import useStringInput from './hooks/useStringInput';
import Example from './containers/Example';

const PostCreateForm: React.FC = () => {
  const [title, handleTitleChange] = useStringInput('');
  const [body, handleBodyChange] = useStringInput('');

  return (
    <form method="POST" className="post-form">
      <label className="mb-2">
        Title:
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="bg-orange-100 border border-orange-500 border-solid rounded focus:border-orange-700"
        />
      </label>
      <label>
        Body:
        <textarea
          value={body}
          onChange={handleBodyChange}
          cols={30}
          rows={10}
          className="bg-orange-100 border border-orange-500 border-solid rounded focus:border-orange-700"
        />
      </label>
      <button type="submit" className="save btn btn-default">
        Save
      </button>
    </form>
  );
};

render(
  <ErrorBoundary>
    <Example />
    <PostCreateForm />
  </ErrorBoundary>,
  document.getElementById('new-post'),
);
