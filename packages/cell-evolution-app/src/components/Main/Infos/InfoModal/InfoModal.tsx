import cn from 'classnames';
import Modal from 'react-modal';
import { Button } from '../../../Button';
import styles from './InfoModal.less';

interface InfoModalProps {
  className?: string;
  modalIsOpen: boolean;
  closeModal: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
}

const customStyles: Modal.Styles = {
  overlay: {
    backgroundColor: `rgba(0, 0, 0, 0.6)`,
  },
};

export function InfoModal(props: InfoModalProps) {
  const { className, modalIsOpen, closeModal } = props;

  return (
    <Modal
      className={cn(styles.InfoModal, className, styles.zoomIn)}
      style={customStyles}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Info Modal"
    >
      <h3>细胞进化需要Ethereum钱包的支持，这样可以进行DNA融合，体验到更多游戏性。 </h3>

      <br />
      <p>
        Metamask 网页下载地址:
        <br />
        <a href="https://metamask.io/download.html" target="_blank">
          https://metamask.io/download.html
        </a>
        <br />
        <br />
        <br />
        <br />
        <h4>小记:</h4>
        <br />
        设计这款游戏的初衷就是想要做出一款真正的游戏,不是区块链的发币，博傻等传统意义上的游戏，我认为区块链是一种工具,让游戏过程,数据更加高效透明的情况下,通过自己的链上逻辑,拥有自己的生态逻辑,可以让游戏过程更加独具游戏性。接着我发现跟传统意义不一样，如果真的有一个游戏可以让所有人参与进生态,无数个体决定世界的走向，那么这就不是一个单机经营，一个简单的积分榜，而是一个真正的匿名群体游戏，有追逐高分的玩家，有群体合作的玩家，有新手，也有高玩，有创造者，也有修补者，各色各样的个体构建一个真正的区块链游戏,
        Cell Evolution. 希望你们喜欢。 -Ling
      </p>

      <div className={styles.footer}>
        <Button type="primary" onClick={closeModal}>
          确定
        </Button>
      </div>
    </Modal>
  );
}
