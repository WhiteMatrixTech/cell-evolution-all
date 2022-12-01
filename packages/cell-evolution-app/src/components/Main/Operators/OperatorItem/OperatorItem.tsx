import cn from 'classnames';
import React, { useCallback } from 'react';

import styles from './OperatorItem.less';

interface OperatorItemProps {
  className?: string;
  icon: string;
  text: string;
  operator: () => void;
}

export function OperatorItem(props: OperatorItemProps) {
  const { className, icon, text, operator } = props;

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      operator();
    },
    [operator],
  );

  return (
    <div className={cn(styles.OperatorItem, className)} onClick={onClick}>
      <div className={styles.icon} style={{ backgroundImage: `url(${icon})` }}></div>
      <div className={styles.text}>{text}</div>
    </div>
  );
}
