import cn from 'classnames';
import { useState } from 'react';
import Tour from 'reactour';

import styles from './Hint.less';
import { useTranslation } from '../../../../i18n';

interface HintProps {
  className?: string;
}



export function Hint(props: HintProps) {
  const { className } = props;
  const { t } = useTranslation();
  const [isTourOpen, setIsTourOpen] = useState(false);

  const steps = [
    {
      selector: '.day',
      navDotAriaLabel: t('survivalDay'),
      content: t('whatIsSurvivalDays'),
    },
    {
      selector: '.cell',
      navDotAriaLabel: t('cellCount'),
      content: t('whatIsCellCount'),
    },
    {
      selector: '.env',
      navDotAriaLabel: t('externalEnvironment'),
      content: t('whatIsExternalEnvironment'),
    },
    {
      selector: '.reproduction',
      navDotAriaLabel: t('reproductive'),
      content: t('whatIsReproduction'),
    },
    {
      selector: '.adaptability',
      navDotAriaLabel: t('adaptability'),
      content: t('whatIsAdaptability'),
    },
    {
      selector: '.survivability',
      navDotAriaLabel: t('survivability'),
      content: t('whatIsSurvivability'),
    },
    {
      selector: '.lifeCycle',
      navDotAriaLabel: t('lifeCycle'),
      content: t('whatIsLifeCycle'),
    },
    {
      selector: '.reproduce',
      navDotAriaLabel: t('reproduce'),
      content: t('whatIsMultiplication'),
    },
    {
      selector: '.evolute',
      navDotAriaLabel: t('evolution'),
      content: t('whatIsEvolution'),
    },
    {
      selector: '.vary',
      navDotAriaLabel: t('mutations'),
      content: t('whatIsMutation'),
    },
    {
      selector: '.dormant',
      navDotAriaLabel: t('dormant'),
      content: t('whatIsDormancy'),
    },
    {
      selector: '.apoptosis',
      navDotAriaLabel: t('apoptosis'),
      content: t('whatIsApoptosis'),
    },
    {
      selector: '.inherit',
      navDotAriaLabel: t('genetic'),
      content: t('whatIsGenetic'),
    },
    {
      selector: '.infos',
      navDotAriaLabel: t('worldAndcell'),
      content: (
        <p>
          {t('whatIsWorldData')}
          <br />
          <br />
          {t('whatIsCellData')}
        </p>
      ),
    },
    {
      navDotAriaLabel: t('BeautyOfTheUniverse'),
      content: (
        <p style={{ textAlign: 'center' }}>
          {t('BeautyOfTheUniverse1')}
          <br />
          <br />
          {t('BeautyOfTheUniverse2')}
          <br />
          <br />
          {t('BeautyOfTheUniverse3')}
        </p>
      ),
    },
  ];
  return (
    <>
      <div className={cn(styles.Hint, className)} onClick={() => setIsTourOpen(true)}>
        <div className={styles.icon}></div>
        <div className={styles.text}>{t('howToPlay')}</div>
      </div>
      <Tour
        className={styles.tour}
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
        badgeContent={(cur: number) => steps[cur - 1].navDotAriaLabel}
      />
    </>
  );
}
