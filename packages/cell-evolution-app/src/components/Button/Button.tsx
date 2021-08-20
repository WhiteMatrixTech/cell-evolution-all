import cn from 'classnames';

import styles from './Button.less';

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  type?: string;
  children: React.ReactChild | React.ReactChildren;
}

export function Button(props: ButtonProps) {
  const { className, children, type = 'default', ...rest } = props;

  return (
    <a
      className={cn(styles.Button, className, {
        [styles.primary]: type === 'primary',
      })}
      {...rest}
    >
      {children}
    </a>
  );
}
