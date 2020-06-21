import { useState, useCallback } from 'react';

/**
 * 要素のサイズを計測するためのclientRectと対象要素に設定するrefを返します。
 *
 * @returns clientRect, ref
 */
export default function useClientRect() {
  const [rect, setRect] = useState<DOMRect>();
  const ref = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref] as const;
}
