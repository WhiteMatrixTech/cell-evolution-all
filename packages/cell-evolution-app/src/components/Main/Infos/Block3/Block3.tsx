import cn from 'classnames';

import styles from './Block3.less';

interface Block3Props {
  className?: string;
}

export function Block3(props: Block3Props) {
  const { className } = props;

  return <div className={cn(styles.Block3, className)}></div>;
}
