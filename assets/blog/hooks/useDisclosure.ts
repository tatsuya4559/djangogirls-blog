import { useState, useCallback } from 'react';

/**
 * 開閉状態と状態遷移の関数を提供します。
 *
 * @param defaultOpen 初期状態がopenの場合true
 * @returns isOpen, onOpen, onClose, onToggle
 */
export default function useDisclosure(defaultOpen: boolean = false) {
  const [isOpen, setOpen] = useState(defaultOpen);
  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);
  const onToggle = useCallback(() => setOpen((prevIsOpen) => !prevIsOpen), []);
  return { isOpen, onOpen, onClose, onToggle };
}
