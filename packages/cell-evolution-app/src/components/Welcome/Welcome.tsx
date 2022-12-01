import cn from 'classnames';
import React, { useCallback } from 'react';

import styles from './Welcome.less';

interface WelcomeProps {
  className?: string;
  onStart: () => void;
}

export function Welcome(props: WelcomeProps) {
  const { className, onStart } = props;

  const onStartClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onStart();
    },
    [onStart],
  );

  return (
    <div className={cn(styles.Welcome, className)}>
      <div className={styles.contentInner}>
        <h2 className={styles.contentTitle}>Evolution</h2>
        <h3 className={styles.contentSubtitle}>Cells and humanity</h3>
        <a className={styles.contentStart} onClick={onStartClick}>
          Start
        </a>
      </div>
    </div>
  );
}
