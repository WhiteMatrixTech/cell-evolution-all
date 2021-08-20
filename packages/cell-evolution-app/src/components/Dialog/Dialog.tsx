import cn from 'classnames';
import { useMemo } from 'react';
import { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Button } from '../Button';

import styles from './Dialog.less';
import { DialogIcon } from './DialogIcon';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

export enum DialogType {
  SUCCESS,
  ERROR,
  INFO,
}

interface DialogProps {
  className?: string;
  type?: DialogType;
  title?: string;
  unMount?: () => void;
  onOk?: () => void;
  okText?: string;
  onCancel?: () => void;
  children?: React.ReactChild | React.ReactChildren;
}
const customStyles: Modal.Styles = {
  overlay: {
    backgroundColor: `rgba(0, 0, 0, 0.6)`,
  },
};

export function Dialog(props: DialogProps) {
  const {
    title,
    type = DialogType.INFO,
    className,
    children,
    onOk,
    okText = '确定',
    onCancel,
    unMount = noop,
  } = props;

  const computedTitle = useMemo(() => {
    if (title) return title;
    if (type === DialogType.SUCCESS) return `操作成功`;
    if (type === DialogType.ERROR) return `操作失败`;
    return '';
  }, [title, type]);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const onDidOk = useCallback(async () => {
    if (onOk) onOk();
    unMount();
  }, [onOk, unMount]);

  const onDidCancel = useCallback(() => {
    if (onCancel) onCancel();
    setVisible(false);
    unMount();
  }, [onCancel, unMount]);

  return (
    <Modal
      className={cn(styles.Dialog, className, {
        [styles.shakeX]: type === DialogType.ERROR && visible,
        [styles.zoomIn]: type === DialogType.SUCCESS && visible,
      })}
      style={customStyles}
      isOpen={visible}
      onRequestClose={() => setVisible(false)}
      contentLabel="dialog"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      {computedTitle && (
        <h3 className={styles.header}>
          <DialogIcon type={type} />
          <div className={styles.titleText}>{computedTitle}</div>
        </h3>
      )}
      <div className={styles.body}>{children}</div>
      <div className={styles.footer}>
        {onOk && (
          <Button type="primary" onClick={onDidOk}>
            {okText}
          </Button>
        )}
        {onCancel && <Button onClick={onDidCancel}>取消</Button>}
      </div>
    </Modal>
  );
}

class SingleRender {
  private static renderInstance: SingleRender;
  private container: HTMLDivElement;
  private constructor() {
    const container = document.createElement('div');
    document.body.append(container);
    this.container = container;
  }

  static getInstance() {
    if (SingleRender.renderInstance === undefined) {
      SingleRender.renderInstance = new SingleRender();
    }
    return SingleRender.renderInstance;
  }

  renderDialog = (modalProps: DialogProps) => {
    const unMount = () => {
      ReactDOM.unmountComponentAtNode(this.container);
    };

    ReactDOM.render(<Dialog {...modalProps} unMount={unMount} />, this.container);

    return unMount;
  };
}

export function dialog(message: React.ReactChild | React.ReactChildren, options?: DialogProps) {
  SingleRender.getInstance().renderDialog({
    children: message,
    ...options,
  });
}

export function success(
  title: string,
  message: React.ReactChild | React.ReactChildren,
  onOk = noop,
) {
  dialog(message, {
    type: DialogType.SUCCESS,
    title,
    onOk,
  });
}

export function error(title: string, message: React.ReactChild | React.ReactChildren, onOk = noop) {
  dialog(message, {
    type: DialogType.ERROR,
    title,
    onOk,
  });
}

export function confirmDialog(
  message: React.ReactChild | React.ReactChildren,
  onOk = noop,
  onCancel = noop,
) {
  dialog(message, {
    onOk,
    onCancel,
  });
}
