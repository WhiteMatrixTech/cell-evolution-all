import { t } from '../../../../i18n';
import type { IGameData } from '../../../../store/gameSlice';
import { error, success } from '../../../Dialog';
import styles from './styles.less';

/**
 * 休眠
 * 生命周期 +
 * 细胞数 -
 * 环境 = Math.floor(存活日 / 10);
 * @param gameData
 */
export async function dormant(gameData: IGameData) {
  const dormantFailure1 = t('whyDormantFailure1');
  const dormantFailure2 = t('whyDormantFailure2')
  return new Promise((resolve, reject) => {
    if (gameData.cell <= 0) {
      error(t('dormantFailure'), dormantFailure1);
      reject(new Error(dormantFailure1));
      return;
    }
    let surviveLife = Math.floor(gameData.survivability * 0.1);
    if (surviveLife < 0) {
      surviveLife = 0;
      error(t('dormantFailure'), dormantFailure2);
      reject(new Error(dormantFailure2));
      return;
    }
    if (surviveLife >= 9) surviveLife = 9;

    const lifeCycle = 10 - gameData.env * 2 + surviveLife;
    const lifeCycleChange = lifeCycle - gameData.lifeCycle;
    const cell = Math.floor(gameData.cell / (gameData.env + 1));
    const cellChange = cell - gameData.cell;

    const day = gameData.day + 1;
    const env = Math.floor(day / 10);
    resolve({
      ...gameData,
      lifeCycle,
      cell,
      day,
      env,
    });
    success(
      t('successfullDormant'),
      <ul className={styles.result}>
        <li>{t('lifeCycle')}&nbsp; {lifeCycleChange >= 0 ? `+${lifeCycleChange}` : lifeCycleChange}</li>
        <li>{t('cellCount')}&nbsp; {cellChange >= 0 ? `+${cellChange}` : cellChange}</li>
        <li>{t('survivalDay')}&nbsp; +1</li>
      </ul>,
    );
  });
}
