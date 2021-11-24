import { t } from '../../../../i18n';
import type { IGameData } from '../../../../store/gameSlice';
import { success } from '../../../Dialog';
import { endGame, getInitGameData } from './endGame';
import styles from './styles.less';

/**
 * 繁殖
 * 生命周期 - 1
 * 细胞数 +
 * 存活日 + 1
 * 环境 = Math.floor(存活日 / 10);
 * @param gameData
 * @returns
 */
export async function reproduce(gameData: IGameData) {
  return new Promise((resolve) => {
    const lifeCycle = gameData.lifeCycle - 1;
    if (lifeCycle < 0) {
      endGame(gameData);
      resolve(getInitGameData());
      return;
    }
    const cellChange = Math.floor(Math.random() * 2 * gameData.reproduction) + 1;
    const cell = gameData.cell + cellChange;
    const day = gameData.day + 1;
    const env = Math.floor(day / 10);
    success(
      t('successfullReproduction'),
      <ul className={styles.result}>
        <li>{t('lifeCycle')}&nbsp; -1</li>
        <li>{t('cellCount')}&nbsp; +{cellChange}</li>
        <li>{t('survivalDay')}&nbsp; +1</li>
      </ul>,
    );
    resolve({ ...gameData, lifeCycle, cell, day, env });
  });
}
