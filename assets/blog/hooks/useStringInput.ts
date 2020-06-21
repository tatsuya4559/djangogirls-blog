import { useState, useCallback, FormEvent } from 'react';

/**
 * `input[type="text"]`, `textarea`, `select`要素の入力値とハンドラーを提供します。
 *
 * @param initialValue 初期値
 * @returns value, handleChange
 */
export default function useStringInput(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    (
      e: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      setValue(e.currentTarget.value);
    },
    [],
  );

  return [value, handleChange] as const;
}
