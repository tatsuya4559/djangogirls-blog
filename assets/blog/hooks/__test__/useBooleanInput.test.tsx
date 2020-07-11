import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import useBooleanInput from '../useBooleanInput';

afterEach(cleanup);

test('初期値が反映されていること', () => {
  {
    const { result } = renderHook(() => useBooleanInput());
    expect(result.current[0]).toBeFalsy();
  }
  {
    const { result } = renderHook(() => useBooleanInput(true));
    expect(result.current[0]).toBeTruthy;
  }
  {
    const { result } = renderHook(() => useBooleanInput(false));
    expect(result.current[0]).toBeFalsy();
  }
});

describe('入力イベントに反応してvalueを更新できること', () => {
  test('checkbox', () => {
    const { result } = renderHook(() => useBooleanInput());
    const { getByLabelText } = render(
      <label>
        test
        <input
          type="checkbox"
          onChange={result.current[1]}
          checked={result.current[0]}
        />
      </label>,
    );
    expect(result.current[0]).toBeFalsy();

    act(() => {
      fireEvent.click(getByLabelText('test'));
    });

    expect(result.current[0]).toBeTruthy();
  });

  test('radio', () => {
    const { result } = renderHook(() => useBooleanInput());
    const { getByLabelText } = render(
      <label>
        test
        <input
          type="radio"
          onChange={result.current[1]}
          checked={result.current[0]}
        />
      </label>,
    );
    expect(result.current[0]).toBeFalsy();

    act(() => {
      fireEvent.click(getByLabelText('test'));
    });

    expect(result.current[0]).toBeTruthy();
  });
});
