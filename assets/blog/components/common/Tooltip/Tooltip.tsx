import React from 'react';
import cx from 'classnames';
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
  return (
    <div className={styles.wrapper}>
      {children}
      <span
        className={cx(className, styles.tooltip, styles[placement], {
          [styles.delay]: delay,
        })}
      >
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
