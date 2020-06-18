import React, { useEffect, cloneElement, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import Backdrop from '../Backdrop/Backdrop';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactElement;
  initialFocusRef?: React.MutableRefObject<HTMLElement | null>;
};

const Modal: React.FC<Props> = ({
  isOpen,
  onClose,
  children,
  initialFocusRef,
}) => {
  if (!isOpen) {
    return null;
  }

  useEffect(() => {
    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, []);

  const floatingChildren = cloneElement(children, {
    style: { ...children.props.style, zIndex: 50 },
  });

  return createPortal(
    <>
      {floatingChildren}
      <Backdrop onClick={onClose} />
    </>,
    document.body,
  );
};

export default Modal;
