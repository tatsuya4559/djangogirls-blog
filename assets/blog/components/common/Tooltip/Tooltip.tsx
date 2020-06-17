import React, { useState, useCallback } from 'react';
import cx from 'classnames';
import styles from './Tooltip.module.css';

type Props = {
  text: string;
  placement: 'top' | 'bottom' | 'right' | 'left';
  className?: string;
};

const Tooltip: React.FC<Props> = ({ text, placement, className, children }) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const measuredRef = useCallback((el: HTMLElement) => {
    setHeight(el.getBoundingClientRect().height);
    setWidth(el.getBoundingClientRect().width);
  }, []);

  // childrenに対して中央に表示されるように位置を計算する
  let positionStyle: React.CSSProperties;
  if (placement === 'top' || placement === 'bottom') {
    positionStyle = {
      left: '50%',
      marginLeft: `-${width / 2}px`,
    };
  } else {
    positionStyle = {
      top: '50%',
      marginTop: `-${height / 2}px`,
    };
  }

  return (
    <div className={styles.wrapper}>
      {children}
      <span
        ref={measuredRef}
        className={cx(className, styles.tooltip, styles[placement])}
        style={positionStyle}
      >
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
