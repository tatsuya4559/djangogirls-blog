import React from 'react';
import cx from 'classnames';
import classes from './Tooltip.module.css';

/**
 * 表示の微調整にclassNameを利用してください
 * placementが'top'または'bottom'の場合は左右の表示位置を調整してください
 */
type Props = {
  text: string;
  placement: 'top' | 'bottom' | 'right' | 'left';
  className?: string;
};

const Tooltip: React.FC<Props> = ({ text, placement, className, children }) => {
  return (
    <div className={classes.wrapper}>
      {children}
      <span className={cx(className, classes.tooltip, classes[placement])}>
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
