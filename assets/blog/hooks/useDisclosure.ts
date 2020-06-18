import { useState, useCallback } from 'react';

export default function useDisclosure(defaultOpen: boolean) {
  const [isOpen, setOpen] = useState(defaultOpen);
  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);
  const onToggle = useCallback(() => setOpen((prevIsOpen) => !prevIsOpen), []);
  return [isOpen, onOpen, onClose, onToggle] as const;
}
