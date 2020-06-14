import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Tooltip from './Tooltip';

afterEach(cleanup);

test('Snapshot', () => {
  const { asFragment } = render(
    <Tooltip text="tooltip" placement="top">
      Test this.
    </Tooltip>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('textに指定した文字列が表示されていること', () => {
  render(
    <Tooltip text="this is test" placement="top">
      <button>hover me</button>
    </Tooltip>,
  );

  expect(screen.getByText('this is test')).toBeInTheDocument();
});

test('childrenコンポーネントが表示されていること', () => {
  render(
    <Tooltip text="this is test" placement="top">
      <button>hover me</button>
    </Tooltip>,
  );

  expect(screen.getByText('hover me')).toBeInTheDocument();
});
