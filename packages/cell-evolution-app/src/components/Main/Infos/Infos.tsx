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

interface InfosProps {
  className?: string;
}

export function Infos(props: InfosProps) {
  const { className } = props;

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
        <a className={styles.wordInfo} onClick={worldInfoClick}></a>
        <a className={styles.cellInfo} onClick={cellInfoClick}></a>
      </div>
      <div className={styles.content}>
        细胞进化是第一款基于区块链的去中心化的沙盒经营策略游戏，所有的玩家扮演一个细胞族群。在这个族群里，我们需要平衡我们
        总体的适应性，生存性与繁殖性。当我们的细胞族群的方向失衡，我们整体将会进化失败。这不仅仅是个游戏，也是个真正的社会
        群体实验。你在这里扮演了一个原始细胞，而无数个你将会决定我们共同的命运。接下来，开启的进化之旅！
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
