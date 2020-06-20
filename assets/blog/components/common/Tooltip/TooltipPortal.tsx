import React, { useState } from 'react';
import { createPortal } from 'react-dom';

type TooltipProps = {
  text: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const Tooltip: React.FC<TooltipProps> = React.memo(
  ({ text, onMouseEnter, onMouseLeave }) => {
    return (
      <span onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {text}
      </span>
    );
  },
);

type PortalProps = {
  text: string;
  placement: 'top' | 'bottom' | 'right' | 'left';
  delay?: number; // ms
  className?: string;
};

const TooltipPortal: React.FC<PortalProps> = React.memo(
  ({ text, placement, delay = 0, className, children }) => {
    const [visible, setVisible] = useState(false);
    const [timerId, setTimerId] = useState<number | undefined>();

    const onMouseEnter = () => {
      setTimerId(window.setTimeout(() => setVisible(true), delay));
    };
    const onMouseLeave = () => {
      window.clearTimeout(timerId);
      setVisible(false);
    };

    return createPortal(
      <Tooltip
        text={text}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </Tooltip>,
      document.body,
    );
  },
);

export default TooltipPortal;
