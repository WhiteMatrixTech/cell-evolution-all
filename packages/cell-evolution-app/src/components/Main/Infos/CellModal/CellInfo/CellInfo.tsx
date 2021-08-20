import cn from 'classnames';
import { useMemo } from 'react';
import { getFinalTitleByCellData } from '../../../Operators/game/titleResolve';
import type { ICellData } from '../../game/cellInfo';
import { CellImg } from './CellImg';

import styles from './CellInfo.less';

interface CellInfoProps {
  className?: string;
  data: ICellData;
  bordered?: boolean;
}

export function CellInfo(props: CellInfoProps) {
  const { className, data, bordered = false } = props;

  const idx = useMemo(() => {
    try {
      if (data.id) {
        return parseInt(data.id, 10);
      }
    } catch (e) {
      /** ignore */
    }
    return 0;
  }, [data.id]);
  return (
    <div className={cn(styles.CellInfo, className)}>
      <CellImg idx={idx} />
      <h1>编号&lt;{data.id}&gt;细胞数据</h1>
      <h2>细胞数: {data.cell}</h2>
      <table
        className={cn(styles.cellTable, {
          [styles.bordered]: bordered,
        })}
      >
        <tbody>
          <tr>
            <th>最终评价:</th>
            <td>{getFinalTitleByCellData(data)}</td>
          </tr>
          <tr>
            <th>适应性:</th>
            <td>{data.adaptability}</td>
          </tr>
          <tr>
            <th>生存性:</th>
            <td>{data.survivability}</td>
          </tr>
          <tr>
            <th>繁殖性:</th>
            <td>{data.reproduction}</td>
          </tr>
          <tr>
            <th>外部环境:</th>
            <td>{data.env}</td>
          </tr>
          <tr>
            <th>存活日:</th>
            <td>{data.day}</td>
          </tr>
          <tr>
            <th>总体得分:</th>
            <td>{data.totalScore}</td>
          </tr>
          <tr>
            <th>细胞创造者:</th>
            <td>{data.creator}</td>
          </tr>
          <tr>
            <th>所属族群:</th>
            <td>{data.owner}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
