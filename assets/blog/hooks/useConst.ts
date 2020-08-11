import { useState } from 'react';

type InitialValue<T> = T | (() => T);

/**
 * コンポーネントが再利用されても使い回す定数を提供します。
 * このhookを使用する前に、コンポーネント外での定数定義とuseMemoの使用を検討してください
 *
 * @param initialValue 定数 or 定数を生成する関数
 * @return 定数
 */
export default function useConst<T>(initialValue: InitialValue<T>): T {
  const [value] = useState(initialValue);
  return value;
}
