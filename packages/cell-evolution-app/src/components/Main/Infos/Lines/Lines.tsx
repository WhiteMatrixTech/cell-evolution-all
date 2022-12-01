/* eslint-disable react/no-array-index-key */
import cn from 'classnames';
import { useMemo } from 'react';

import styles from './Lines.less';

interface LinesProps {
  className?: string;
  count?: number;
}

export function Lines(props: LinesProps) {
  const { className, count = 10 } = props;

  const LineList = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i += 1) {
      list.push({
        gap: getGapWidth(),
        width: getWidth(),
      });
    }
    return list;
  }, [count]);

  return (
    <div className={cn(styles.Lines, className)}>
      {LineList.map((l, i) => {
        return (
          <div
            className={styles.line}
            style={{ width: `${l.width}px`, marginLeft: `${l.gap}px` }}
            key={i}
          ></div>
        );
      })}
    </div>
  );
}

function getWidth() {
  return Math.floor(Math.random() * 4) + 4;
}
function getGapWidth() {
  return Math.floor(Math.random() * 4) + 3;
}
