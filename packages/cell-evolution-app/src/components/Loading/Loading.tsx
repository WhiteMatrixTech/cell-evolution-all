import cn from 'classnames';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import styles from './Loading.less';
import { LoadingIcon } from './LoadingIcon';

interface LoadingProps {
  className?: string;
  children: React.ReactChild | React.ReactChildren;
}
const customStyles: Modal.Styles = {
  overlay: {
    backgroundColor: `rgba(0, 0, 0, 0.6)`,
  },
};

export function Loading(props: LoadingProps) {
  const { className, children } = props;

  // return <div className={cn(styles.Loading, className)}>Loading</div>;

  return (
    <Modal
      className={cn(styles.Loading, className)}
      style={customStyles}
      isOpen={true}
      contentLabel="Loading Modal"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <LoadingIcon />
      {children}
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

  renderDialog = (modalProps: LoadingProps) => {
    const unMount = () => {
      ReactDOM.unmountComponentAtNode(this.container);
    };

    ReactDOM.render(<Loading {...modalProps} />, this.container);

    return unMount;
  };
}

export function loading(message = 'Loading...', options?: LoadingProps) {
  return SingleRender.getInstance().renderDialog({
    children: message,
    ...options,
  });
}
