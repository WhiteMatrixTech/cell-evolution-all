import cn from 'classnames';
import { useState } from 'react';
import { useEffect } from 'react';
import type { IWalletInfo } from '../../utils/etherClient';
import { contractChainId, contractChainName } from '../../utils/etherClient';
import { etherClient } from '../../utils/etherClient';

import styles from './ChainCheck.less';

interface ChainCheckProps {
  className?: string;
}

export function ChainCheck(props: ChainCheckProps) {
  const { className } = props;

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
