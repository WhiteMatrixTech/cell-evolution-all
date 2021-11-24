import cn from 'classnames';
import { useCallback } from 'react';
import { OperatorItem } from './OperatorItem';

import reproduceIcon from './icons/reproduce.svg';
import evoluteIcon from './icons/evolute.svg';
import varyIcon from './icons/vary.svg';
import dormantIcon from './icons/dormant.svg';
import apoptosisIcon from './icons/apoptosis.svg';
import inheritIcon from './icons/inherit.svg';

import styles from './Operators.less';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectGame, setData } from '../../../store/gameSlice';
import { confirmDialog } from '../../Dialog/Dialog';
import { reproduce } from './game/reproduce';
import { evolute } from './game/evolute';
import { vary } from './game/vary';
import { dormant } from './game/dormant';
import { apoptosis } from './game/apoptosis';
// import { loading } from '../../Loading/Loading';
import { inherit } from './game/inherit';
import { t } from '../../../i18n'

interface OperatorsProps {
  className?: string;
}

export function Operators(props: OperatorsProps) {
  const { className } = props;
  // const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const gameData = useAppSelector(selectGame);

  const reproduceOperator = useCallback(async () => {
    try {
      const data = await reproduce(gameData);
      dispatch(setData(data));
    } catch (e) {
      /* ignore */
    }
  }, [dispatch, gameData]);

  const evoluteOperator = useCallback(async () => {
    try {
      const data = await evolute(gameData);
      dispatch(setData(data));
    } catch (e) {
      /* ignore */
    }
  }, [dispatch, gameData]);

  const varyOperator = useCallback(async () => {
    try {
      const data = await vary(gameData);
      dispatch(setData(data));
    } catch (e) {
      /* ignore */
    }
  }, [dispatch, gameData]);

  const dormantOperator = useCallback(async () => {
    try {
      const data = await dormant(gameData);
      dispatch(setData(data));
    } catch (e: any) {
      /* ignore */
    }
  }, [dispatch, gameData]);

  const apoptosisOperator = useCallback(() => {
    confirmDialog(t('afterApoptosis'), () => {
      apoptosis(gameData)
        .then((data) => {
          dispatch(setData(data));
        })
        .catch(() => {
          /** ignore */
        });
    });
  }, [dispatch, gameData]);

  const inheritOperator = useCallback(async () => {
    try {
      const data = await inherit(gameData);
      dispatch(setData(data));
    } catch (e) {
      /** ignore */
    }
  }, [dispatch, gameData]);

  return (
    <div className={cn(styles.Operators, className)}>
      <OperatorItem
        icon={reproduceIcon}
        text={t('reproduce')}
        operator={reproduceOperator}
        className="reproduce"
      />
      <OperatorItem icon={evoluteIcon} text={t('evolution')} operator={evoluteOperator} className="evolute" />
      <OperatorItem icon={varyIcon} text={t('mutations')} operator={varyOperator} className="vary" />
      <OperatorItem icon={dormantIcon} text={t('dormant')} operator={dormantOperator} className="dormant" />
      <OperatorItem
        icon={apoptosisIcon}
        text={t('apoptosis')}
        operator={apoptosisOperator}
        className="apoptosis"
      />
      <OperatorItem icon={inheritIcon} text={t('genetic')} operator={inheritOperator} className="inherit" />
    </div>
  );
}
