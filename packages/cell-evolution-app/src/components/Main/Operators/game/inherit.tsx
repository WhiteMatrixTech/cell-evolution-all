import type { IGameData } from '../../../../store/gameSlice';
import { contractChainId, etherClient } from '../../../../utils/etherClient';
import { loading } from '../../../Loading';
import { error, success } from '../../../Dialog/Dialog';
import styles from './styles.less';
import { t } from '../../../../i18n';

/**
 * 遗传
 * @param gameData
 * @returns
 */
export async function inherit(gameData: IGameData) {
  const geneticFailure1 = t('whyGeneticFailure1');
  return new Promise((resolve, reject) => {
    if (gameData.day > 1) {
      error(t('geneticFailure'), geneticFailure1);
      reject(new Error(geneticFailure1));
      return;
    }
    const close = loading(t('loading1'));
    doInherit(gameData).then(resolve).catch(reject).finally(close);
  });
}

export async function doInherit(gameData: IGameData): Promise<IGameData> {
  const geneticFailure2 = t('whyGeneticFailure2');
  const geneticFailure3 = t('whyGeneticFailure3');
  const geneticFailure4 = t('whyGeneticFailure4');
  await etherClient.loadProvider();
  const walletInfo = await etherClient.getWalletInfo();
  if (!walletInfo) {
    error(t('geneticFailure'), geneticFailure2);
    throw new Error(geneticFailure2);
  }
  if (walletInfo.chainId !== contractChainId) {
    error(t('geneticFailure'), `${geneticFailure3}${contractChainId}`);
    throw new Error(`${geneticFailure3}${contractChainId}`);
  }
  etherClient.connectCellEvolutionContract();
  // etherClient.connectSigner();
  if (!etherClient.client) {
    error(t('geneticFailure'), geneticFailure4);
    throw new Error(geneticFailure4);
  }
  const [ada, sur, rep, no] = await etherClient.client.inheritance();
  const adaptability = ada.toNumber();
  const survivability = sur.toNumber();
  const reproduction = rep.toNumber();
  success(
    t('successfullGenetic'),
    <ul className={styles.result}>
      <li>{t('geneticNumber')} No.{no.toNumber()}</li>
      <br />
      <li>{t('naturallyReproductive')} {reproduction}</li>
      <li>{t('naturallyAdaptable')} {adaptability}</li>
      <li>{t('naturalSurvivability')} {survivability}</li>
    </ul>,
  );

  return { ...gameData, adaptability, survivability, reproduction };
}
