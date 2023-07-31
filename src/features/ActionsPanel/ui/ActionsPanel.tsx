import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, BUTTON_CLASS } from 'shared';
import styles from './ActionsPanel.module.scss';

type Callback = () => void;

type Props<T> = {
  saveTemplate: T;
  swapModal: T;
};

export const ActionsPanel: FC<Props<Callback>> = ({ saveTemplate, swapModal }) => {
  const navigate = useNavigate();

  return (
    <section className={styles.actions}>
      <Button buttonClass={BUTTON_CLASS.save} handler={saveTemplate}>
        Save
      </Button>
      <Button buttonClass={BUTTON_CLASS.preview} handler={swapModal}>
        Preview
      </Button>
      <Button buttonClass={BUTTON_CLASS.close} handler={() => navigate('/')}>
        Close
      </Button>
    </section>
  );
};
