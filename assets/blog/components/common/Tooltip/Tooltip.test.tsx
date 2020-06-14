import React from 'react';
import { render, cleanup } from '@testing-library/react';
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
  const { getByText } = render(
    <Tooltip text="this is test" placement="top">
      <button>hover me</button>
    </Tooltip>,
  );
  expect(getByText('this is test')).toBeInTheDocument();
});

test('childrenコンポーネントが表示されていること', () => {
  const { getByText } = render(
    <Tooltip text="this is test" placement="top">
      <button>hover me</button>
    </Tooltip>,
  );
  expect(getByText('hover me')).toBeInTheDocument();
});

describe('placementに対応したクラスが適用されていること', () => {
  test('top', () => {
    const { getByText } = render(
      <Tooltip text="this is test" placement="top">
        <button>hover me</button>
      </Tooltip>,
    );
    expect(getByText('this is test')).toHaveClass('tooltip');
    expect(getByText('this is test')).toHaveClass('top');
  });

  test('bottom', () => {
    const { getByText } = render(
      <Tooltip text="this is test" placement="bottom">
        <button>hover me</button>
      </Tooltip>,
    );
    expect(getByText('this is test')).toHaveClass('tooltip');
    expect(getByText('this is test')).toHaveClass('bottom');
  });

  test('right', () => {
    const { getByText } = render(
      <Tooltip text="this is test" placement="right">
        <button>hover me</button>
      </Tooltip>,
    );
    expect(getByText('this is test')).toHaveClass('tooltip');
    expect(getByText('this is test')).toHaveClass('right');
  });

  test('left', () => {
    const { getByText } = render(
      <Tooltip text="this is test" placement="left">
        <button>hover me</button>
      </Tooltip>,
    );
    expect(getByText('this is test')).toHaveClass('tooltip');
    expect(getByText('this is test')).toHaveClass('left');
  });
});
