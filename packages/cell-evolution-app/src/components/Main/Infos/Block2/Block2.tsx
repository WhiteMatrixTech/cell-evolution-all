import cn from 'classnames';

import styles from './Block2.less';

interface Block2Props {
  className?: string;
}

export function Block2(props: Block2Props) {
  const { className } = props;

  return <div className={cn(styles.Block2, className)}></div>;
}
