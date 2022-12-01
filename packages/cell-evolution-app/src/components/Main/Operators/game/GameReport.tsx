import type { IGameData } from '../../../../store/gameSlice';
import { getFinalTitle } from './titleResolve';
import styles from './styles.less';
import { t } from '../../../../i18n';

interface IGameReportProps {
  data: IGameData;
}
export function GameReport({ data: gameData }: IGameReportProps) {
  const totalScore = getTotalScore(gameData);

  return (
    <div>
      <h3>{t('gameOver')}</h3>
      <br />
      <ul className={styles.result}>
        <li>{t('cellCount')}: {gameData.cell}</li>
        <li>{t('adaptability')}: {gameData.adaptability}</li>
        <li>{t('survivability')}: {gameData.survivability}</li>
        <li>{t('reproductive')}: {gameData.reproduction}</li>
        <li>{t('externalEnvironment')}: {gameData.env}</li>
        <li>{t('survivalDay')}: {gameData.day}</li>
        <li>{t('finalScore')} {totalScore}</li>
        <li>{t('finalEvaluation')} {getFinalTitle(gameData)}</li>
      </ul>
      <br />
      <p>{t('isUploadDNA')}</p>
    </div>
  );
}

function getTotalScore(gameData: IGameData) {
  return (
    gameData.cell +
    (gameData.adaptability + gameData.survivability + gameData.reproduction) * 100 +
    gameData.day * gameData.env
  );
}
