import { useState, useCallback, FormEvent } from 'react';

/**
 * `input[type="checkbox"]`, `input[type="radio"]`要素の入力値とハンドラーを提供します。
 *
 * @param initialValue 初期値
 * @returns value, handleChange
 */
export default function useBooleanInput(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.checked);
  }, []);

  return [value, handleChange] as const;
}
