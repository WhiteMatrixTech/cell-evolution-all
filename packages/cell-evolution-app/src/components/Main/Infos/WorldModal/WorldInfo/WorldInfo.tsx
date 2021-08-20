import cn from 'classnames';
import { useMemo } from 'react';
import { WorldImg } from './WorldImg';

import styles from './WorldInfo.less';

interface WorldInfoProps {
  className?: string;
  data?: IWorldInfo;
}
export interface IWorldInfo {
  day?: number;
  cell?: number;
  env?: number;
  reproduction?: number;
  adaptability?: number;
  survivability?: number;

  id?: string;
  totalScore?: string;
  worldTitle?: string;
}
export function WorldInfo(props: WorldInfoProps) {
  const { className, data } = props;

  const idx = useMemo(() => {
    try {
      if (data?.id) {
        return parseInt(data.id, 10);
      }
    } catch (e) {
      /** ignore */
    }
    return 0;
  }, [data?.id]);
  return (
    <div className={cn(styles.WorldInfo, className)}>
      <WorldImg idx={idx} />
      <h3 className={styles.title}>编号&lt;{data?.id}&gt;世界数据</h3>
      <table className={cn(styles.worldTable, styles.bordered)}>
        <tbody>
          <tr>
            <th>世界细胞数:</th>
            <td>{data?.cell}</td>
          </tr>
          <tr>
            <th>世界适应性:</th>
            <td>{data?.adaptability}</td>
          </tr>
          <tr>
            <th>世界生存性:</th>
            <td>{data?.survivability}</td>
          </tr>
          <tr>
            <th>世界繁殖性:</th>
            <td>{data?.reproduction}</td>
          </tr>
          <tr>
            <th>世界外部环境:</th>
            <td>{data?.env}</td>
          </tr>
          <tr>
            <th>世界存活日:</th>
            <td>{data?.day}</td>
          </tr>
          <tr>
            <th>总体得分:</th>
            <td>{data?.totalScore}</td>
          </tr>
          <tr>
            <th>世界称号:</th>
            <td>{data?.worldTitle}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              已经有{data?.id}
              个族群毁灭，请注意族群的平衡发展,一味的追逐高分也许并不能带来胜利。-Ling
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
