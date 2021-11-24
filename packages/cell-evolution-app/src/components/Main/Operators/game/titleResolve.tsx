import { t } from '../../../../i18n';
import type { IGameData } from '../../../../store/gameSlice';
import type { ICellData } from '../../Infos/game/cellInfo';

/**
 * 细胞数量对应title
 * @param cellNo 细胞数
 * @returns
 */
export function cellNoResolve(cellNo: number) {
  if (cellNo < 50) {
    return t('veryLittle');
  }
  if (cellNo < 100) {
    return t('minority');
  }
  if (cellNo < 1000) {
    return <span color="blue">{t('less')}</span>;
  }
  if (cellNo < 10000) {
    return <span color="blue">{t('medium')}</span>;
  }
  if (cellNo < 100000) {
    return <span color="gold">{t('more')}</span>;
  }
  if (cellNo < 10000000) {
    return <span color="gold">{t('many')}</span>;
  }
  if (cellNo < 100000000) {
    return <span color="red">{t('superMulti')}</span>;
  }
  return <span color="red">{t('countlessMillions')}</span>;
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
    return <span color="red">{t('supercell')}</span>;
  }
  if (typeCalc > 1000) {
    return <span color="gold">{t('eukaryoticCells')}</span>;
  }
  if (typeCalc > 500) {
    return <span color="violet">{t('prokaryoticCells')}</span>;
  }
  if (typeCalc > 100) {
    return <span color="blue">{t('paleonuclearCells')}</span>;
  }
  return t('singleCell');
}

/**
 *
 * @returns 🧟‍♀️
 */
export function zoomResolve() {
  const zombieRandom = Math.random();
  if (zombieRandom > 0.99) {
    return <span color="red">{t('zombie')}</span>;
  }
  if (zombieRandom > 0.95) {
    return <span color="gold">{t('zombieSubspecies')}</span>;
  }
  return t('normal');
}

export function environmentResolve(environment: number) {
  if (environment > 8) {
    return <span color="red">{t('superbEnvironmentalResistance')}</span>;
  }
  if (environment > 6) {
    return <span color="gold">{t('strongEnvironmentalResistance')}</span>;
  }
  if (environment > 3) {
    return <span color="blue">{t('weakerEnvironmentalResistance')}</span>;
  }
  return t('weakEnvironmentalResistance');
}

export function adaptionResolve(adaption: number) {
  if (adaption > 10000) {
    return <span color="red">{t('superbAdaptation')}</span>;
  }
  return '';
}
export function surviveResolve(surviveAbility: number) {
  if (surviveAbility > 10000) {
    return <span color="red">{t('superSurvival')}</span>;
  }
  return '';
}
export function divisionResolve(division: number) {
  if (division > 10000) {
    return <span color="red">{t('superbBreeding')}</span>;
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
