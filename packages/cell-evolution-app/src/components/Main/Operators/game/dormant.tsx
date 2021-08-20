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
  return new Promise((resolve, reject) => {
    if (gameData.cell <= 0) {
      error('休眠失败', '至少需要1个细胞才能休眠');
      reject(new Error('至少需要1个细胞才能休眠'));
      return;
    }
    let surviveLife = Math.floor(gameData.survivability * 0.1);
    if (surviveLife < 0) {
      surviveLife = 0;
      error('休眠失败', '数据错误,作弊行为或者网络卡顿～');
      reject(new Error('数据错误,作弊行为或者网络卡顿～'));
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
      '休眠成功',
      <ul className={styles.result}>
        <li>生命周期 {lifeCycleChange >= 0 ? `+${lifeCycleChange}` : lifeCycleChange}</li>
        <li>细胞数 {cellChange >= 0 ? `+${cellChange}` : cellChange}</li>
        <li>存活日 +1</li>
      </ul>,
    );
  });
}
