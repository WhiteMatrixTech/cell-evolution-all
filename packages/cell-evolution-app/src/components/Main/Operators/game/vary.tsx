import { t } from '../../../../i18n';
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
  const mutationsFailure = t('whyMutationsFailure')
  return new Promise((resolve, reject) => {
    if (gameData.cell <= 0) {
      error(t('mutationsFailure'), mutationsFailure);
      reject(new Error(mutationsFailure));
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
        t('successfullMutations'),
        <ul className={styles.result}>
          <li>{t('lifeCycle')}&nbsp; -1</li>
          <li>{t('cellCount')}&nbsp; {cellChange}</li>
          <li>{t('survivalDay')}&nbsp; +1</li>
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
        t('successfullMutations'),
        <ul className={styles.result}>
          <li>{t('lifeCycle')}&nbsp; -1</li>
          <li>{t('cellCount')}&nbsp; {cellChange}</li>
          <li>{t('reproductive')}&nbsp; +{mDivChange}</li>
          <li>{t('adaptability')}&nbsp; +{mAdaChange}</li>
          <li>{t('survivability')}&nbsp; +{mSurChange}</li>
          <li>{t('survivalDay')}&nbsp; +1</li>
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
      t('successfullMutations'),
      <ul className={styles.result}>
        <li>{t('lifeCycle')}&nbsp; -1</li>
        <li>{t('reproductive')}&nbsp; +{mDivChange}</li>
        <li>{t('adaptability')}&nbsp; +{mAdaChange}</li>
        <li>{t('survivability')}&nbsp; +{mSurChange}</li>
        <li>{t('survivalDay')}&nbsp; +1</li>
      </ul>,
    );
  });
}
