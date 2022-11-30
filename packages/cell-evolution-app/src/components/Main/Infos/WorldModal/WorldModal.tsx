import cn from 'classnames';
import { useState } from 'react';
import Modal from 'react-modal';
import { Button } from '../../../Button';
import { Input } from '../../../Input';
import { t } from '../../../../i18n';
import styles from './WorldModal.less';
import { getWorldInfo } from '../game/worldInfo';
import { useCallback } from 'react';
import { loading } from '../../../Loading';
import { dialog, DialogType, error } from '../../../Dialog/Dialog';
import { WorldInfo } from './WorldInfo';
import { CellList } from './CellList';
import type { ICellData } from '../game/cellInfo';

interface WorldModalProps {
  className?: string;
  modalIsOpen: boolean;
  closeModal: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
}

const customStyles: Modal.Styles = {
  overlay: {
    backgroundColor: `rgba(0, 0, 0, 0.6)`,
  },
};

export function WorldModal(props: WorldModalProps) {
  const { className, modalIsOpen, closeModal } = props;
  // const { t } = useTranslation();

  const [worldDetailIsOpen, setWorldDetailIsOpen] = useState(false);
  const [cellsList, setCellsList] = useState<ICellData[]>([]);

  const openWorldDetailModal = (cells: ICellData[]) => {
    setCellsList(cells);
    setWorldDetailIsOpen(true);
  };
  const closeWorldDetailModal = () => {
    setCellsList([]);
    setWorldDetailIsOpen(false);
  };
  const [worldId, setWorldId] = useState('');
  const openDetailModal = useCallback(() => {
    const close = loading(t('loading2', { id: worldId }));
    getWorldInfo(worldId)
      .then((world) => {
        dialog(<WorldInfo data={world} />, {
          type: DialogType.SUCCESS,
          title: t('worldInformation'),
          okText: t('details'),
          onOk: () => {
            // open worldList
            openWorldDetailModal(world.cells);
          },
          onCancel: () => { },
        });
      })
      .catch((e) => {
        error(t('readWorldDataFailed'), e.message);
      })
      .finally(close);
  }, [worldId]);

  const closeWorldModel = useCallback(
    (e) => {
      setWorldId('');
      closeModal(e);
    },
    [closeModal],
  );
  return (
    <>
      <Modal
        className={cn(styles.WorldModal, className, styles.zoomIn)}
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeWorldModel}
        contentLabel="World Info Modal"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        <h3 className={styles.title}>{t('enterTheWordID')}</h3>
        <div className={styles.body}>
          <Input
            placeholder={t('worldID')}
            value={worldId}
            onChange={(e) => setWorldId(e.currentTarget.value)}
          />
        </div>
        <div className={styles.footer}>
          <Button type="primary" onClick={openDetailModal}>
            {t('ok')}
          </Button>
          <Button onClick={closeWorldModel}>{t('cancel')}</Button>
        </div>
      </Modal>

      <Modal
        className={cn(styles.WorldDetailModal, className)}
        style={customStyles}
        isOpen={worldDetailIsOpen}
        onRequestClose={closeWorldDetailModal}
        contentLabel="World Detail Info Modal"
      >
        <div className={styles.content}>
          <div className={styles.body}>
            <CellList list={cellsList} />
          </div>
          <div className={styles.footer}>
            <Button type="primary" onClick={closeWorldDetailModal}>
              {t('ok')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
