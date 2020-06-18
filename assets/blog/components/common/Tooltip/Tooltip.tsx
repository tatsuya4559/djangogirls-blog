import React, { useState, useCallback } from 'react';
import cx from 'classnames';
import useClientRect from '../../../hooks/useClientRect';
import styles from './Tooltip.module.css';

type Props = {
  text: string;
  placement: 'top' | 'bottom' | 'right' | 'left';
  delay?: boolean;
  className?: string;
};

const Tooltip: React.FC<Props> = ({
  text,
  placement,
  delay,
  className,
  children,
}) => {
  const [rect, ref] = useClientRect();

  // childrenに対して中央に表示されるように位置を計算する
  let positionStyle: React.CSSProperties;
  if (placement === 'top' || placement === 'bottom') {
    const width = rect ? rect.width : 0;
    positionStyle = {
      left: '50%',
      marginLeft: `-${width / 2}px`,
    };
  } else {
    const height = rect ? rect.height : 0;
    positionStyle = {
      top: '50%',
      marginTop: `-${height / 2}px`,
    };
  }

  return (
    <div className={styles.wrapper}>
      {children}
      <span
        ref={ref}
        className={cx(className, styles.tooltip, styles[placement], {
          [styles.delay]: delay,
        })}
        style={positionStyle}
      >
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
