import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderHook, act } from '@testing-library/react-hooks';
import useDisclosure from '../useDisclosure';

describe('初期値が反映されていること', () => {
  test('true', () => {
    const { result } = renderHook(() => useDisclosure(true));
    expect(result.current.isOpen).toBeTruthy();
  });
  test('false', () => {
    const { result } = renderHook(() => useDisclosure(false));
    expect(result.current.isOpen).toBeFalsy();
  });
  test('default', () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBeFalsy();
  });
});

test('onOpenを呼び出すとisOpenがtrueになること', () => {
  const { result } = renderHook(() => useDisclosure());
  expect(result.current.isOpen).toBeFalsy();
  act(() => {
    result.current.onOpen();
  });
  expect(result.current.isOpen).toBeTruthy();
  act(() => {
    result.current.onOpen();
  });
  expect(result.current.isOpen).toBeTruthy();
});

test('onCloseを呼び出すとisOpenがfalseになること', () => {
  const { result } = renderHook(() => useDisclosure(true));
  expect(result.current.isOpen).toBeTruthy();
  act(() => {
    result.current.onClose();
  });
  expect(result.current.isOpen).toBeFalsy();
  act(() => {
    result.current.onClose();
  });
  expect(result.current.isOpen).toBeFalsy();
});

test('onToggleを呼び出すとisOpenが反転すること', () => {
  const { result } = renderHook(() => useDisclosure());
  expect(result.current.isOpen).toBeFalsy();
  act(() => {
    result.current.onToggle();
  });
  expect(result.current.isOpen).toBeTruthy();
  act(() => {
    result.current.onToggle();
  });
  expect(result.current.isOpen).toBeFalsy();
});
