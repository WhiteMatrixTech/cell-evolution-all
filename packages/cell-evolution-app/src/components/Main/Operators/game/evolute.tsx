import type { IGameData } from '../../../../store/gameSlice';
import { error, success } from '../../../Dialog';
import styles from './styles.less';
import { endGame, getInitGameData } from './endGame';

/**
 * 进化
 * 生命周期 - 5
 * 繁殖性 + Math.floor(Math.random() * 5) + Math.floor(Math.random() * 繁殖性);
 * 适应性 + Math.floor(Math.random() * 5) + Math.floor(Math.random() * 适应性);
 * 生存性 + Math.floor(Math.random() * 5) + Math.floor(Math.random() * 生存性);
 * 存活日 + 1
 * 环境 = Math.floor(存活日 / 10);
 * @param gameData
 */
export async function evolute(gameData: IGameData) {
  return new Promise((resolve, reject) => {
    if (gameData.cell <= 0) {
      error('进化失败', '至少需要1个细胞才能进化');
      reject(new Error('至少需要1个细胞才能进化'));
      return;
    }
    const lifeCycle = gameData.lifeCycle - 5;
    if (lifeCycle < 0) {
      endGame(gameData);
      resolve(getInitGameData());
      return;
    }
    const balanceCheck =
      (gameData.adaptability + gameData.survivability + gameData.reproduction) / 3;

    if (
      !(
        gameData.adaptability <= balanceCheck * 1.5 &&
        gameData.adaptability >= balanceCheck * 0.5 &&
        gameData.survivability <= balanceCheck * 1.5 &&
        gameData.survivability >= balanceCheck * 0.5 &&
        gameData.reproduction <= balanceCheck * 1.5 &&
        gameData.reproduction >= balanceCheck * 0.5
      )
    ) {
      error('进化失败', '需要属性平衡才能进化');
      reject(new Error('需要属性平衡才能进化'));
      return;
    }

    const adaChange =
      Math.floor(Math.random() * 5) + Math.floor(Math.random() * gameData.adaptability);
    const surChange =
      Math.floor(Math.random() * 5) + Math.floor(Math.random() * gameData.survivability);
    const divChange =
      Math.floor(Math.random() * 5) + Math.floor(Math.random() * gameData.reproduction);
    const adaptability = gameData.adaptability + adaChange;
    const survivability = gameData.survivability + surChange;
    const reproduction = gameData.reproduction + divChange;
    const day = gameData.day + 1;
    const env = Math.floor(day / 10);
    success(
      '进化成功',
      <ul className={styles.result}>
        <li>生命周期 -5</li>
        <li>繁殖性 +{reproduction}</li>
        <li>适应性 +{adaptability}</li>
        <li>生存性 +{survivability}</li>
        <li>存活日 +1</li>
      </ul>,
    );
    resolve({
      ...gameData,
      lifeCycle,
      adaptability,
      day,
      survivability,
      reproduction,
      env,
    });
  });
}
