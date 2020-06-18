import { useState } from 'react';

type InitialValue<T> = T | (() => T);

export default function useConst<T>(initialValue: InitialValue<T>): T {
  const [value] = useState(initialValue);
  return value;
}
