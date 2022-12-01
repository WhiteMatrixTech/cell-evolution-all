import cn from 'classnames';
import p1 from './imgs/p1.png';
import p2 from './imgs/p2.png';
import p3 from './imgs/p3.png';
import p4 from './imgs/p4.png';
import p5 from './imgs/p5.png';
import p6 from './imgs/p6.png';
import p7 from './imgs/p7.png';
import p8 from './imgs/p8.png';
import p9 from './imgs/p9.png';
import p10 from './imgs/p10.png';

import styles from './WorldImg.less';
import { useMemo } from 'react';

interface WorldImgProps {
  className?: string;
  idx: number;
}

export function WorldImg(props: WorldImgProps) {
  const { className, idx } = props;

  const url = useMemo(() => {
    const picIndex = idx % 6;
    switch (picIndex) {
      case 0:
        return p1;
      case 1:
        return p2;
      case 2:
        return p3;
      case 3:
        return p4;
      case 4:
        return p5;
      case 5:
        return p6;
      case 6:
        return p7;
      case 7:
        return p8;
      case 8:
        return p9;
      default:
        return p10;
    }
  }, [idx]);

  return (
    <div className={cn(styles.WorldImg, className)}>
      <img src={url} />
    </div>
  );
}
