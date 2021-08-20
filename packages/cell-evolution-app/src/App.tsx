import { Background } from './components/Background';
import styles from './App.less';
import { Welcome } from './components/Welcome';
import { useEffect, useState } from 'react';
import { Main } from './components/Main';
import cn from 'classnames';
import { useRef } from 'react';
import Modal from 'react-modal';
import { ChainCheck } from './components/ChainCheck';

function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // fade in App when app loaded.
    setLoaded(true);
  }, []);

  const [page, setPage] = useState(0);
  const onStart = () => {
    // fade in Main when started.
    setPage(1);
  };

  const appRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (appRef.current) Modal.setAppElement(appRef.current);
  }, []);

  return (
    <div
      ref={appRef}
      className={cn(styles.App, styles.fade, {
        [styles.in]: loaded,
      })}
    >
      <Background />
      <ChainCheck />
      {/* 已开始, 显示main */}
      {page === 1 && (
        <Main
          className={cn(styles.fade, {
            [styles.in]: page === 1,
          })}
        />
      )}
      {/* 未开始, 显示welcome */}
      {page === 0 && <Welcome onStart={onStart} />}
    </div>
  );
}

export default App;
