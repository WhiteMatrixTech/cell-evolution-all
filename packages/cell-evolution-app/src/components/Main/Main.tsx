import cn from 'classnames';
import { Infos } from './Infos';

import styles from './Main.less';
import { Operators } from './Operators';
import { Status } from './Status';

interface MainProps {
  className?: string;
}

export function Main(props: MainProps) {
  const { className } = props;

  return (
    <div className={cn(styles.Main, className)}>
      <Status />
      <Operators />
      <Infos />
    </div>
  );
}
