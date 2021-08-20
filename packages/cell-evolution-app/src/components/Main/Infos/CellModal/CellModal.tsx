import cn from 'classnames';
import { useCallback } from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { Button } from '../../../Button';
import { error, success } from '../../../Dialog';
import { Input } from '../../../Input';
import { loading } from '../../../Loading';
import { getCellInfo } from '../game/cellInfo';
import { CellInfo } from './CellInfo';

import styles from './CellModal.less';

interface CellModalProps {
  className?: string;
  modalIsOpen: boolean;
  closeModal: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
}

const customStyles: Modal.Styles = {
  overlay: {
    backgroundColor: `rgba(0, 0, 0, 0.6)`,
  },
};

export function CellModal(props: CellModalProps) {
  const { className, modalIsOpen, closeModal } = props;
  const [cellId, setCellId] = useState('');
  const openDetailModal = useCallback(() => {
    const close = loading(`读取细胞编号<${cellId}>资料中..`);
    getCellInfo(cellId)
      .then((cell) => {
        success(`读取细胞信息成功`, <CellInfo data={cell} bordered={true} />);
      })
      .catch((e) => {
        error(`读取世界数据失败`, e.message);
      })
      .finally(close);
  }, [cellId]);

  const closeCellModel = useCallback(
    (e) => {
      setCellId('');
      closeModal(e);
    },
    [closeModal],
  );
  return (
    <>
      <Modal
        className={cn(styles.CellModal, className, styles.zoomIn)}
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeCellModel}
        contentLabel="Cell Info Modal"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        <h3 className={styles.title}>输入想要读取细胞的ID</h3>
        <div className={styles.body}>
          <Input
            placeholder="细胞ID"
            value={cellId}
            onChange={(e) => setCellId(e.currentTarget.value)}
          />
        </div>
        <div className={styles.footer}>
          <Button type="primary" onClick={openDetailModal}>
            确定
          </Button>
          <Button onClick={closeCellModel}>取消</Button>
        </div>
      </Modal>
    </>
  );
}
