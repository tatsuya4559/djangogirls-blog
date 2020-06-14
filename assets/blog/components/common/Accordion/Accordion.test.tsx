import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Accordion from './Accordion';

afterEach(cleanup);

test('snapshot', () => {
  const { asFragment } = render(
    <Accordion>
      <Accordion.Header>hoge</Accordion.Header>
      <Accordion.Content>hoge content</Accordion.Content>
      <Accordion.Header>fuga</Accordion.Header>
      <Accordion.Content>fuga content</Accordion.Content>
    </Accordion>,
  );
  expect(asFragment()).toMatchSnapshot();
});

describe('Accordion.Content', () => {
  test('childrenが描画されること', () => {
    const childText = 'childです';
    const { getByText } = render(
      <Accordion.Content>
        <p>{childText}</p>
      </Accordion.Content>,
    );
    expect(getByText(childText)).toBeInTheDocument();
  });

  test('classNameが適用されること', () => {
    const { getByText } = render(
      <Accordion.Content className="hoge">fuga</Accordion.Content>,
    );
    expect(getByText('fuga')).toHaveClass('hoge');
  });
});

describe('Accordion.Header', () => {
  test('childrenが描画されること', () => {
    const childText = 'hoge';
    const { getByText } = render(
      <Accordion.Header>
        <p>{childText}</p>
      </Accordion.Header>,
    );
    expect(getByText(childText)).toBeInTheDocument();
  });

  test('classNameが適用されること', () => {
    const { getByText } = render(
      <Accordion.Header className="hoge">fuga</Accordion.Header>,
    );
    expect(getByText('fuga')).toHaveClass('hoge');
  });

  test('Headerごとにラジオボタンのidが異なること', () => {
    const { getByLabelText } = render(
      <>
        <Accordion.Header>hoge</Accordion.Header>
        <Accordion.Header>fuga</Accordion.Header>
      </>,
    );
    const hogeId = getByLabelText('hoge').getAttribute('id');
    const fugaId = getByLabelText('fuga').getAttribute('id');
    expect(hogeId).not.toBe(fugaId);
  });

  test('defaultOpenが指定されたHeaderはcheckがついていること', () => {
    const { getByLabelText } = render(
      <>
        <Accordion.Header defaultOpen>hoge</Accordion.Header>
        <Accordion.Header>fuga</Accordion.Header>
      </>,
    );
    expect(getByLabelText('hoge')).toBeChecked();
    expect(getByLabelText('fuga')).not.toBeChecked();
  });

  test('labelをクリックしてcheckがつくこと', () => {
    const { getByText, getByLabelText } = render(
      <>
        <Accordion.Header>hoge</Accordion.Header>
        <Accordion.Header>fuga</Accordion.Header>
      </>,
    );
    expect(getByLabelText('hoge')).not.toBeChecked();
    expect(getByLabelText('fuga')).not.toBeChecked();

    fireEvent.click(getByText('hoge'));

    expect(getByLabelText('hoge')).toBeChecked();
    expect(getByLabelText('fuga')).not.toBeChecked();

    fireEvent.click(getByText('fuga'));

    expect(getByLabelText('hoge')).not.toBeChecked();
    expect(getByLabelText('fuga')).toBeChecked();
  });
});

describe('Accordion', () => {
  test('Accordion内でラジオボタンのグループが揃っていること', () => {
    const { getByLabelText } = render(
      <>
        <Accordion>
          <Accordion.Header>hoge</Accordion.Header>
          <Accordion.Header>fuga</Accordion.Header>
        </Accordion>
        <Accordion>
          <Accordion.Header>piyo</Accordion.Header>
        </Accordion>
      </>,
    );
    const hogeName = getByLabelText('hoge').getAttribute('name');
    const fugaName = getByLabelText('fuga').getAttribute('name');
    const piyoName = getByLabelText('piyo').getAttribute('name');
    expect(hogeName).toBe(fugaName);
    expect(hogeName).not.toBe(piyoName);
  });
});
