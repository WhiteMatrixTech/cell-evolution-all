import cn from 'classnames';
import { useMemo } from 'react';
import dna1 from './imgs/dna1.png';
import dna2 from './imgs/dna2.png';
import dna3 from './imgs/dna3.png';
import dna4 from './imgs/dna4.png';
import dna5 from './imgs/dna5.png';
import dna6 from './imgs/dna6.png';
import dna7 from './imgs/dna7.png';

import styles from './CellImg.less';

interface CellImgProps {
  className?: string;
  idx: number;
}

export function CellImg(props: CellImgProps) {
  const { className, idx } = props;

  const url = useMemo(() => {
    const picIndex = idx % 6;
    switch (picIndex) {
      case 0:
        return dna1;
      case 1:
        return dna2;
      case 2:
        return dna3;
      case 3:
        return dna4;
      case 4:
        return dna5;
      case 5:
        return dna6;
      default:
        return dna7;
    }
  }, [idx]);

  return (
    <div className={cn(styles.CellImg, className)}>
      <img src={url} />
    </div>
  );
}
