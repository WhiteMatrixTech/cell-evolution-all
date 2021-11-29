import cn from 'classnames';
import Modal from 'react-modal';
import { Button } from '../../../Button';
import styles from './InfoModal.less';
import { t } from '../../../../i18n'

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
  const okText = t('ok');

  return (
    <Modal
      className={cn(styles.InfoModal, className, styles.zoomIn)}
      style={customStyles}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Info Modal"
    >
      <h3>{t('whatIsinfoTitle')} </h3>

      <br />
      <p>
        {t('metamaskLink')}
        <br />
        <a href="https://metamask.io/download.html" target="_blank">
          https://metamask.io/download.html
        </a>
        <br />
        <br />
        <br />
        <h4>{t('note')}</h4>
        <br />
        {t('noteContent')}
      </p>

      <div className={styles.footer}>
        <Button type="primary" onClick={closeModal}>
          {okText}
        </Button>
      </div>
    </Modal>
  );
}
