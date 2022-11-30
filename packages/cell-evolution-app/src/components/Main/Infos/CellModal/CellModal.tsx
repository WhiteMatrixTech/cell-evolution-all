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
import { t } from '../../../../i18n'

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
  // const { t } = useTranslation();
  const [cellId, setCellId] = useState('');
  const openDetailModal = useCallback(() => {
    const close = loading(t('loading3', { id: cellId }));
    getCellInfo(cellId)
      .then((cell) => {
        success(t('cellInformationSuccessfully'), <CellInfo data={cell} bordered={true} />);
      })
      .catch((e) => {
        error(t('readWorldDataFailed'), e.message);
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
        <h3 className={styles.title}>{t('enterCellId')}</h3>
        <div className={styles.body}>
          <Input
            placeholder={t('cellId')}
            value={cellId}
            onChange={(e) => setCellId(e.currentTarget.value)}
          />
        </div>
        <div className={styles.footer}>
          <Button type="primary" onClick={openDetailModal}>
            {t('ok')}
          </Button>
          <Button onClick={closeCellModel}>{t('cancel')}</Button>
        </div>
      </Modal>
    </>
  );
}
