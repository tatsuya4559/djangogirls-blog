import React, { useEffect, useCallback, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import Backdrop from '../Backdrop/Backdrop';

const ESC_KEY_CODE = 27;

type ContentProps = {
  onClose: () => void;
  closeOnEsc: boolean;
};

const ModalContent: React.FC<ContentProps> = ({
  onClose,
  closeOnEsc,
  children,
}) => {
  const handleEscPressed = (e: KeyboardEvent) => {
    if (e.keyCode === ESC_KEY_CODE) {
      onClose();
    }
  };

  useEffect(() => {
    if (closeOnEsc) {
      document.addEventListener('keydown', handleEscPressed);
    }
    return () => {
      document.removeEventListener('keydown', handleEscPressed);
    };
  });

  return <>{children}</>;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactElement;
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

  const handleClose = useCallback(() => {
    onClose();
    if (finalFocusRef && finalFocusRef.current) {
      finalFocusRef.current.focus();
    }
  }, [onClose, finalFocusRef]);

  // initialFocusRefにフォーカスを移す
  useEffect(() => {
    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, []);

  // TODO: 配置を計算 left 50%, ml -1/2*width top 4rem
  const floatingChildren = cloneElement(children, {
    style: { ...children.props.style, zIndex: 50 },
  });

  return createPortal(
    <>
      <ModalContent onClose={handleClose} closeOnEsc={closeOnEsc}>
        {floatingChildren}
      </ModalContent>
      <Backdrop onClick={closeOnBackdropClick ? handleClose : () => {}} />
    </>,
    document.body,
  );
};

export default Modal;
