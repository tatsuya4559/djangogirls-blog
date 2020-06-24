import React, { useEffect, useCallback, cloneElement } from 'react';
import { createPortal } from 'react-dom';

const ESC_KEY_CODE = 27;

type ContentProps = {
  onClose: () => void;
  closeOnEsc: boolean;
  children: React.ReactNode;
};

const ModalContent: React.FC<ContentProps> = ({
  onClose,
  closeOnEsc,
  children,
}) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // keyCodeは非推奨だがIEのために使用する
    if (closeOnEsc && (e.code === 'Escape' || e.keyCode === ESC_KEY_CODE)) {
      e.stopPropagation();
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      {children}
    </div>
  );
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  // children: React.ReactElement;
  initialFocusRef?: React.MutableRefObject<HTMLElement | null>; // Modalを開いたときにフォーカスされる要素のref
  finalFocusRef?: React.MutableRefObject<HTMLElement | null>; // Modalを閉じたあとにフォーカスされる要素のref
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
};

const Modal: React.FC<Props> = ({
  isOpen,
  onClose,
  children,
  initialFocusRef,
  finalFocusRef,
  closeOnBackdropClick = true,
  closeOnEsc = true,
}) => {
  if (!isOpen) {
    return null;
  }

  // initialFocusRefにフォーカスを移す
  useEffect(() => {
    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    if (finalFocusRef && finalFocusRef.current) {
      finalFocusRef.current.focus();
    }
  }, [onClose, finalFocusRef]);

  return createPortal(
    <div className="fixed h-screen w-full top-0">
      <ModalContent onClose={handleClose} closeOnEsc={closeOnEsc}>
        {children}
      </ModalContent>
      <div
        className="absolute h-screen w-full z-40 bg-black bg-opacity-50"
        onClick={closeOnBackdropClick ? handleClose : undefined}
      />
    </div>,
    document.body,
  );
};

export default Modal;
