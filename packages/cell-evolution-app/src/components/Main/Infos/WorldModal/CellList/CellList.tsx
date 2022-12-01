import cn from 'classnames';
import { CellInfo } from '../../CellModal/CellInfo';
import type { ICellData } from '../../game/cellInfo';

import styles from './CellList.less';

interface CellListProps {
  className?: string;
  list: ICellData[];
}

export function CellList(props: CellListProps) {
  const { className, list } = props;

  return (
    <div className={cn(styles.CellList, className)}>
      {list.map((data) => (
        <div className={styles.cellListItem} key={data.id}>
          <CellInfo data={data} />
        </div>
      ))}
    </div>
  );
}
