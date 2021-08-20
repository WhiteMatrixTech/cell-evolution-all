import type { IGameData } from '../../../../store/gameSlice';
import { endGame, getInitGameData } from './endGame';

/**
 * 凋亡
 * @param gameData
 */
/**
 * 凋亡
 * @param gameData
 * @returns
 */
export async function apoptosis(gameData: IGameData) {
  return new Promise((resolve) => {
    let { adaptability, survivability, reproduction } = gameData;
    if (adaptability >= survivability && adaptability >= reproduction) {
      survivability = 0;
      reproduction = 0;
      adaptability = Math.floor(Math.random() * adaptability);
    }
    if (survivability >= adaptability && survivability >= reproduction) {
      adaptability = 0;
      reproduction = 0;
      survivability = Math.floor(Math.random() * survivability);
    }
    if (reproduction >= survivability && reproduction >= adaptability) {
      adaptability = 0;
      survivability = 0;
      reproduction = Math.floor(Math.random() * reproduction);
    }

    const finalGameData = { ...gameData, survivability, reproduction, adaptability };

    setTimeout(() => {
      endGame(finalGameData);
    }, 0);
    resolve(getInitGameData());
  });
}
