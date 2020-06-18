import { useState, useCallback } from 'react';

export default function useClientRect() {
  const [rect, setRect] = useState<DOMRect>();
  const ref = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref] as const;
}
