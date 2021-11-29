import cn from 'classnames';
import { useState } from 'react';
import { useEffect } from 'react';
import type { IWalletInfo } from '../../utils/etherClient';
import { contractChainId, contractChainName } from '../../utils/etherClient';
import { etherClient } from '../../utils/etherClient';
import { switchLanguage, useTranslation } from '../../i18n'


import styles from './ChainCheck.less';

interface ChainCheckProps {
  className?: string;
}

export function ChainCheck(props: ChainCheckProps) {
  const { className } = props;
  const { t, i18n } = useTranslation();

  const [loaded, setLoaded] = useState(false);
  const [walletInfo, setWalletInfo] = useState<IWalletInfo | null>(null);
  useEffect(() => {
    const doSetWalletInfo = () => {
      doGetWalletInfo()
        .then((info) => {
          if (info) setWalletInfo(info);
        })
        .catch(() => {
          /** ignore */
        })
        .finally(() => {
          setLoaded(true);
        });
    };
    doSetWalletInfo();
    const dispose = etherClient.onAccountsChange(doSetWalletInfo);
    return dispose.dispose;
  }, []);

  return (
    <div className={cn(styles.ChainCheck, className)}>
      <div className={styles.language}>
        <div className={cn({ [styles.selected]: t(i18n.language) === '中文' })} onClick={() => switchLanguage('zh')}>{t('zh')}</div>
        <div className={cn({ [styles.selected]: t(i18n.language) === 'en-US' })} onClick={() => switchLanguage('en-US')}>{t('en')}</div>
      </div>
      {loaded && (
        <>
          {!walletInfo && <div className={styles.error}>no metaMask connected</div>}
          {walletInfo && walletInfo.chainId !== contractChainId && (
            <div className={styles.warning}>please switch chain to {contractChainName}</div>
          )}
          {walletInfo && walletInfo.chainId === contractChainId && (
            <div className={styles.info}>
              <div>
                address:{walletInfo.address.substr(0, 6)}...{walletInfo.address.substr(-4)}
              </div>
              <div>balance: {walletInfo.balance}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export async function doGetWalletInfo() {
  await etherClient.loadProvider();
  return await etherClient.getWalletInfo();
}
