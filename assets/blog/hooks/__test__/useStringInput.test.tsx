import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import useStringInput from '../useStringInput';

test('初期値が反映されていること', () => {
  {
    const { result } = renderHook(() => useStringInput());
    expect(result.current[0]).toBe('');
  }
  {
    const { result } = renderHook(() => useStringInput('test'));
    expect(result.current[0]).toBe('test');
  }
});

describe('入力イベントに反応してvalueを更新できること', () => {
  test('input', () => {
    const { result } = renderHook(() => useStringInput());
    const { getByPlaceholderText } = render(
      <input
        type="text"
        placeholder="test"
        onChange={result.current[1]}
        value={result.current[0]}
      />,
    );

    act(() => {
      fireEvent.change(getByPlaceholderText('test'), {
        target: { value: 'test input' },
      });
    });

    expect(result.current[0]).toBe('test input');
  });

  test('textarea', () => {
    const { result } = renderHook(() => useStringInput());
    const { getByPlaceholderText } = render(
      <textarea
        placeholder="test"
        onChange={result.current[1]}
        value={result.current[0]}
      />,
    );

    act(() => {
      fireEvent.change(getByPlaceholderText('test'), {
        target: { value: 'test input' },
      });
    });

    expect(result.current[0]).toBe('test input');
  });

  test('select', () => {
    const { result } = renderHook(() => useStringInput('python'));
    const { getByLabelText } = render(
      <label>
        choice
        <select onChange={result.current[1]} value={result.current[0]}>
          <option value="python">Python</option>
          <option value="ruby">Ruby</option>
          <option value="perl">Perl</option>
        </select>
      </label>,
    );
    expect(result.current[0]).toBe('python');

    act(() => {
      fireEvent.change(getByLabelText('choice'), {
        target: { value: 'perl' },
      });
    });

    expect(result.current[0]).toBe('perl');
  });
});
