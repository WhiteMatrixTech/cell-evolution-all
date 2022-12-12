import cn from 'classnames';

import styles from './Infos.less';
import { Lines } from './Lines';
import './Block/Block.less';
import { Block } from './Block';
import { Block2 } from './Block2';
import { Block3 } from './Block3';
import { Hint } from './Hint';
import tag from './backImgs/tag.svg';
import React, { useCallback } from 'react';
import { InfoModal } from './InfoModal';
import './WorldModal/WorldModal.less';
import { WorldModal } from './WorldModal';
import { CellModal } from './CellModal';
import { useTranslation } from '../../../i18n';

interface InfosProps {
  className?: string;
}

export function Infos(props: InfosProps) {
  const { className } = props;
  const { t } = useTranslation();
  const [worldModalIsOpen, setWorldModalIsOpen] = React.useState(false);
  const worldInfoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setWorldModalIsOpen(true);
  }, []);

  const [cellModalIsOpen, setCellModalIsOpen] = React.useState(false);
  const cellInfoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setCellModalIsOpen(true);
  }, []);

  const [infoModalIsOpen, setInfoModalIsOpen] = React.useState(false);
  const moreInfo = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setInfoModalIsOpen(true);
  }, []);

  return (
    <div className={cn(styles.Infos, className)}>
      <div className={cn(styles.head, 'infos')}>
        <a className={t('local') === 'English' ? styles.wordInfoEn : styles.wordInfo} onClick={worldInfoClick}></a>
        <a className={t('local') === 'English' ? styles.cellInfoEn : styles.cellInfo} onClick={cellInfoClick}></a>
      </div>
      <div className={styles.content}>
        {t('whatIsCellEvolution')}
        <br />
        More Info:
        <a className={styles.tag} onClick={moreInfo}>
          <img src={tag} />
        </a>
        <Lines className={styles.leftLines} count={20} />
        <Lines className={styles.rightLines} />
        <Block className={styles.block} />
        <Block2 className={styles.block2} />
        <Block3 className={styles.block3} />
        <Hint className={styles.hint} />
      </div>

      <WorldModal modalIsOpen={worldModalIsOpen} closeModal={() => setWorldModalIsOpen(false)} />
      <CellModal modalIsOpen={cellModalIsOpen} closeModal={() => setCellModalIsOpen(false)} />
      <InfoModal modalIsOpen={infoModalIsOpen} closeModal={() => setInfoModalIsOpen(false)} />
    </div>
  );
}
