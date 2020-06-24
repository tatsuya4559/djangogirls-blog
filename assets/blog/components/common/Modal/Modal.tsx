import React, { useEffect, useCallback, cloneElement } from 'react';
import { createPortal } from 'react-dom';

const ESC_KEY_CODE = 27;

type ContentProps = {
  onClose: () => void;
  initialFocusRef: React.MutableRefObject<HTMLElement | null> | undefined;
  closeOnEsc: boolean;
};

const ModalContent: React.FC<ContentProps> = ({
  onClose,
  closeOnEsc,
  initialFocusRef,
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

  useEffect(() => {
    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      {children}
    </div>
  );
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
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
  const handleClose = useCallback(() => {
    onClose();
    if (finalFocusRef && finalFocusRef.current) {
      finalFocusRef.current.focus();
    }
  }, [onClose, finalFocusRef]);

  return createPortal(
    isOpen && (
      <div className="fixed h-screen w-full top-0">
        <ModalContent
          onClose={handleClose}
          closeOnEsc={closeOnEsc}
          initialFocusRef={initialFocusRef}
        >
          {children}
        </ModalContent>
        <div
          className="absolute h-screen w-full z-40 bg-black bg-opacity-50"
          onClick={closeOnBackdropClick ? handleClose : undefined}
        />
      </div>
    ),
    document.body,
  );
};

export default Modal;
