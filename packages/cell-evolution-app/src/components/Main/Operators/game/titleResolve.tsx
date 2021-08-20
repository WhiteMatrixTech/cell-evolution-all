import type { IGameData } from '../../../../store/gameSlice';
import type { ICellData } from '../../Infos/game/cellInfo';

/**
 * 细胞数量对应title
 * @param cellNo 细胞数
 * @returns
 */
export function cellNoResolve(cellNo: number) {
  if (cellNo < 50) {
    return '极少';
  }
  if (cellNo < 100) {
    return '少数';
  }
  if (cellNo < 1000) {
    return <span color="blue">较少</span>;
  }
  if (cellNo < 10000) {
    return <span color="blue">中等数量</span>;
  }
  if (cellNo < 100000) {
    return <span color="gold">较多</span>;
  }
  if (cellNo < 10000000) {
    return <span color="gold">很多</span>;
  }
  if (cellNo < 100000000) {
    return <span color="red">超级多</span>;
  }
  return <span color="red">数以亿计</span>;
}

/**
 * 细胞类型对应关系
 * @param surviveAbility 生存性
 * @param adaption 适应性
 * @param division 繁殖性
 * @returns 细胞类型
 */
export function typeResolve(surviveAbility: number, adaption: number, division: number) {
  const typeCalc = surviveAbility + adaption + division;

  if (typeCalc > 100000) {
    return <span color="red">超级细胞</span>;
  }
  if (typeCalc > 1000) {
    return <span color="gold">真核细胞</span>;
  }
  if (typeCalc > 500) {
    return <span color="violet">原核细胞</span>;
  }
  if (typeCalc > 100) {
    return <span color="blue">古核细胞</span>;
  }
  return '单细胞';
}

/**
 *
 * @returns 🧟‍♀️
 */
export function zoomResolve() {
  const zombieRandom = Math.random();
  if (zombieRandom > 0.99) {
    return <span color="red">僵尸</span>;
  }
  if (zombieRandom > 0.95) {
    return <span color="gold">僵尸亚种</span>;
  }
  return '正常';
}

export function environmentResolve(environment: number) {
  if (environment > 8) {
    return <span color="red">超强环境抵抗</span>;
  }
  if (environment > 6) {
    return <span color="gold">较强环境抵抗</span>;
  }
  if (environment > 3) {
    return <span color="blue">较弱环境抵抗</span>;
  }
  return '弱环境抵抗';
}

export function adaptionResolve(adaption: number) {
  if (adaption > 10000) {
    return <span color="red">超强适应</span>;
  }
  return '';
}
export function surviveResolve(surviveAbility: number) {
  if (surviveAbility > 10000) {
    return <span color="red">超强生存</span>;
  }
  return '';
}
export function divisionResolve(division: number) {
  if (division > 10000) {
    return <span color="red">超强繁殖</span>;
  }
  return '';
}

export function getFinalTitle(gameData: IGameData) {
  return (
    <>
      {cellNoResolve(gameData.cell)}
      {typeResolve(gameData.survivability, gameData.adaptability, gameData.reproduction)}
      {environmentResolve(gameData.env)}
      {adaptionResolve(gameData.adaptability)}
    </>
  );
}

export function getFinalTitleByCellData(cellData: ICellData) {
  return (
    <>
      {cellNoResolve(cellData.cell || 0)}
      {typeResolve(
        cellData.survivability || 0,
        cellData.adaptability || 0,
        cellData.reproduction || 0,
      )}
      {environmentResolve(cellData.env || 0)}
      {adaptionResolve(cellData.adaptability || 0)}
    </>
  );
}
