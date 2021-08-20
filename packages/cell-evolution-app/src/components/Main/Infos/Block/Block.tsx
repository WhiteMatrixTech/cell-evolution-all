import cn from 'classnames';

import styles from './Block.less';

interface BlockProps {
  className?: string;
}

export function Block(props: BlockProps) {
  const { className } = props;

  return <div className={cn(styles.Block, className)}></div>;
}
