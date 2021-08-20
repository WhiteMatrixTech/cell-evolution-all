import cn from 'classnames';

import styles from './StatusItem.less';

interface StatusItemProps {
  className?: string;
  count: number;
  icon: string;
  text: string;
}

export function StatusItem(props: StatusItemProps) {
  const { className, icon, text, count } = props;
  return (
    <div className={cn(styles.StatusItem, className)}>
      <div className={styles.iconWrapper}>
        <img src={icon} />
      </div>
      <div className={styles.text}>
        {text}:<span className={styles.count}>{count}</span>
      </div>
    </div>
  );
}
