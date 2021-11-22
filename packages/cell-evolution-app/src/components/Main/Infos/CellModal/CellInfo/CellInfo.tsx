import cn from 'classnames';
import { useMemo } from 'react';
import { getFinalTitleByCellData } from '../../../Operators/game/titleResolve';
import type { ICellData } from '../../game/cellInfo';
import { CellImg } from './CellImg';

import styles from './CellInfo.less';
import { useTranslation } from '../../../../../i18n'

interface CellInfoProps {
  className?: string;
  data: ICellData;
  bordered?: boolean;
}

export function CellInfo(props: CellInfoProps) {
  const { className, data, bordered = false } = props;
  const { t } = useTranslation();

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
      <h1>{t('number')}&lt;{data.id}&gt;{t('cellData')}</h1>
      <h2>{t('cellCount')}: {data.cell}</h2>
      <table
        className={cn(styles.cellTable, {
          [styles.bordered]: bordered,
        })}
      >
        <tbody>
          <tr>
            <th>{t('finalEvaluation')}</th>
            <td>{getFinalTitleByCellData(data)}</td>
          </tr>
          <tr>
            <th>{t('adaptability')}&nbsp;:</th>
            <td>{data.adaptability}</td>
          </tr>
          <tr>
            <th>{t('survivability')}&nbsp;:</th>
            <td>{data.survivability}</td>
          </tr>
          <tr>
            <th>{t('reproductive')}&nbsp;:</th>
            <td>{data.reproduction}</td>
          </tr>
          <tr>
            <th>{t('externalEnvironment')}&nbsp;:</th>
            <td>{data.env}</td>
          </tr>
          <tr>
            <th>{t('survivalDay')}&nbsp;:</th>
            <td>{data.day}</td>
          </tr>
          <tr>
            <th>{t('overallScore')}</th>
            <td>{data.totalScore}</td>
          </tr>
          <tr>
            <th>{t('cellCreator')}</th>
            <td>{data.creator}</td>
          </tr>
          <tr>
            <th>{t('ethnicGroup')}</th>
            <td>{data.owner}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
