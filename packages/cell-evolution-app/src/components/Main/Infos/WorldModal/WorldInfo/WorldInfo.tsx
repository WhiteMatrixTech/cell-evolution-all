import cn from 'classnames';
import { useMemo } from 'react';
import { WorldImg } from './WorldImg';

import styles from './WorldInfo.less';
import { useTranslation } from '../../../../../i18n'

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
  const { t } = useTranslation()

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
      <h3 className={styles.title}>{t('number')}&lt;{data?.id}&gt;{t('worldData')}</h3>
      <table className={cn(styles.worldTable, styles.bordered)}>
        <tbody>
          <tr>
            <th>{t('worldCellCount')}</th>
            <td>{data?.cell}</td>
          </tr>
          <tr>
            <th>{t('worldAdaptability')}</th>
            <td>{data?.adaptability}</td>
          </tr>
          <tr>
            <th>{t('worldSurvivability')}</th>
            <td>{data?.survivability}</td>
          </tr>
          <tr>
            <th>{t('worldReproductiveness')}</th>
            <td>{data?.reproduction}</td>
          </tr>
          <tr>
            <th>{t('worldExternalEnvironmen')}</th>
            <td>{data?.env}</td>
          </tr>
          <tr>
            <th>{t('worldSurvivalDay')}</th>
            <td>{data?.day}</td>
          </tr>
          <tr>
            <th>{t('overallScore')}</th>
            <td>{data?.totalScore}</td>
          </tr>
          <tr>
            <th>{t('worldTitle')}</th>
            <td>{data?.worldTitle}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              {t('groupHasBeenDestroyed', { number: data?.id })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
