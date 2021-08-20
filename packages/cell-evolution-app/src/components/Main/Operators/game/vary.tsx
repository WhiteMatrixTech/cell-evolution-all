import type { IGameData } from '../../../../store/gameSlice';
import { error } from '../../../Dialog';
import { success } from '../../../Dialog/Dialog';
import { endGame, getInitGameData } from './endGame';
import styles from './styles.less';

/**
 * 变异
 * @param gameData
 * @returns
 */
export async function vary(gameData: IGameData) {
  return new Promise((resolve, reject) => {
    if (gameData.cell <= 0) {
      error('变异失败', '至少需要1个细胞才能变异');
      reject(new Error('至少需要1个细胞才能变异'));
      return;
    }
    const lifeCycle = gameData.lifeCycle - 1;
    if (lifeCycle < 0) {
      endGame(gameData);
      resolve(getInitGameData());
      return;
    }
    const mAdaChange =
      Math.floor(Math.random() * 2) + Math.floor(Math.random() * gameData.adaptability);
    const mSurChange =
      Math.floor(Math.random() * 2) + Math.floor(Math.random() * gameData.survivability);
    const mDivChange =
      Math.floor(Math.random() * 2) + Math.floor(Math.random() * gameData.reproduction);

    const mode = Math.floor(Math.random() * 2 + gameData.adaptability / 100000);
    if (mode === 0) {
      const cell = Math.floor(gameData.cell / 2);
      const cellChange = cell - gameData.cell;
      const day = gameData.day + 1;
      const env = Math.floor(day / 10);
      resolve({
        ...gameData,
        cell,
        lifeCycle,
        day,
        env,
      });
      success(
        '变异成功',
        <ul className={styles.result}>
          <li>生命周期 -1</li>
          <li>细胞数 {cellChange}</li>
          <li>存活日 +1</li>
        </ul>,
      );
      return;
    }
    if (mode === 1) {
      const cell = Math.floor(gameData.cell / 2);
      const cellChange = cell - gameData.cell;

      const adaptability = gameData.adaptability + mAdaChange;
      const survivability = gameData.survivability + mSurChange;
      const reproduction = gameData.reproduction + mDivChange;
      const day = gameData.day + 1;
      const env = Math.floor(day / 10);
      resolve({
        ...gameData,
        cell,
        adaptability,
        survivability,
        reproduction,
        lifeCycle,
        day,
        env,
      });
      success(
        '变异成功',
        <ul className={styles.result}>
          <li>生命周期 -1</li>
          <li>细胞数 {cellChange}</li>
          <li>繁殖性 +{mDivChange}</li>
          <li>适应性 +{mAdaChange}</li>
          <li>生存性 +{mSurChange}</li>
          <li>存活日 +1</li>
        </ul>,
      );
      return;
    }
    const adaptability = gameData.adaptability + mAdaChange;
    const survivability = gameData.survivability + mSurChange;
    const reproduction = gameData.reproduction + mDivChange;
    const day = gameData.day + 1;
    const env = Math.floor(day / 10);

    resolve({
      ...gameData,
      adaptability,
      survivability,
      reproduction,
      lifeCycle,
      day,
      env,
    });
    success(
      '变异成功',
      <ul className={styles.result}>
        <li>生命周期 -1</li>
        <li>繁殖性 +{mDivChange}</li>
        <li>适应性 +{mAdaChange}</li>
        <li>生存性 +{mSurChange}</li>
        <li>存活日 +1</li>
      </ul>,
    );
  });
}
