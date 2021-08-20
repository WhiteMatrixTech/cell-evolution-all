import cn from 'classnames';

import styles from './Input.less';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input(props: InputProps) {
  const { className, ...rest } = props;

  return (
    <div className={cn(styles.Input, className)}>
      <input type="text" {...rest} />
      <span className={styles.left}></span>
      <span className={styles.right}></span>
      <span className={styles.top}></span>
      <span className={styles.bottom}></span>
    </div>
  );
}
