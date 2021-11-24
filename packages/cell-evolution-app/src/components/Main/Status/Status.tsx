import cn from 'classnames';

import styles from './Status.less';
import { StatusItem } from './StatusItem';

import dayIcon from './icons/day.svg';
import cellIcon from './icons/cell.svg';
import envIcon from './icons/env.svg';
import reproductionIcon from './icons/reproduction.svg';
import adaptabilityIcon from './icons/adaptability.svg';
import survivabilityIcon from './icons/survivability.svg';
import lifeCycleIcon from './icons/lifeCycle.svg';
import { useAppSelector } from '../../../store/hooks';
import { selectGame } from '../../../store/gameSlice';
import { useTranslation } from '../../../i18n'

interface StatusProps {
  className?: string;
}

export function Status(props: StatusProps) {
  const { className } = props;
  const { t } = useTranslation()

  const gameData = useAppSelector(selectGame);

  return (
    <div className={cn(styles.Status, className)}>
      <div className={styles.rowOne}>
        <StatusItem icon={dayIcon} text={t('survivalDay')} count={gameData.day} className="day" />
        <StatusItem icon={cellIcon} text={t('cellCount')} count={gameData.cell} className="cell" />
        <StatusItem icon={envIcon} text={t('externalEnvironment')} count={gameData.env} className="env" />
      </div>
      <div className={styles.rowTwo}>
        <StatusItem
          icon={reproductionIcon}
          text={t('reproductive')}
          count={gameData.reproduction}
          className="reproduction"
        />
        <StatusItem
          icon={adaptabilityIcon}
          text={t('adaptability')}
          count={gameData.adaptability}
          className="adaptability"
        />
        <StatusItem
          icon={survivabilityIcon}
          text={t('survivability')}
          count={gameData.survivability}
          className="survivability"
        />
        <StatusItem
          icon={lifeCycleIcon}
          text={t('lifeCycle')}
          count={gameData.lifeCycle}
          className="lifeCycle"
        />
      </div>
    </div>
  );
}
