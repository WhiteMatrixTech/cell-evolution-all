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

interface StatusProps {
  className?: string;
}

export function Status(props: StatusProps) {
  const { className } = props;

  const gameData = useAppSelector(selectGame);

  return (
    <div className={cn(styles.Status, className)}>
      <div className={styles.rowOne}>
        <StatusItem icon={dayIcon} text="存活日" count={gameData.day} className="day" />
        <StatusItem icon={cellIcon} text="细胞数" count={gameData.cell} className="cell" />
        <StatusItem icon={envIcon} text="外部环境" count={gameData.env} className="env" />
      </div>
      <div className={styles.rowTwo}>
        <StatusItem
          icon={reproductionIcon}
          text="繁殖性"
          count={gameData.reproduction}
          className="reproduction"
        />
        <StatusItem
          icon={adaptabilityIcon}
          text="适应性"
          count={gameData.adaptability}
          className="adaptability"
        />
        <StatusItem
          icon={survivabilityIcon}
          text="生存性"
          count={gameData.survivability}
          className="survivability"
        />
        <StatusItem
          icon={lifeCycleIcon}
          text="生命周期"
          count={gameData.lifeCycle}
          className="lifeCycle"
        />
      </div>
    </div>
  );
}
