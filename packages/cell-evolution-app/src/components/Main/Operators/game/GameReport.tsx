import type { IGameData } from '../../../../store/gameSlice';
import { getFinalTitle } from './titleResolve';
import styles from './styles.less';

interface IGameReportProps {
  data: IGameData;
}
export function GameReport({ data: gameData }: IGameReportProps) {
  const totalScore = getTotalScore(gameData);

  return (
    <div>
      <h3>游戏结束</h3>
      <br />
      <ul className={styles.result}>
        <li>细胞数: {gameData.cell}</li>
        <li>适应性: {gameData.adaptability}</li>
        <li>生存性: {gameData.survivability}</li>
        <li>繁殖性: {gameData.reproduction}</li>
        <li>外部环境: {gameData.env}</li>
        <li>存活日: {gameData.day}</li>
        <li>总体得分: {totalScore}</li>
        <li>最终评价: {getFinalTitle(gameData)}</li>
      </ul>
      <br />
      <p>是否上传DNA，融合进族群？</p>
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
