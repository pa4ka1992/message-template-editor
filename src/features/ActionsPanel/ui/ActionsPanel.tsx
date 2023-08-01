import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosSave, IoMdDesktop, IoMdClose } from 'react-icons/io';
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
        <IoIosSave className={styles.icon} />
        Save
      </Button>
      <Button buttonClass={BUTTON_CLASS.preview} handler={swapModal}>
        <IoMdDesktop className={styles.icon} />
        Preview
      </Button>
      <Button buttonClass={BUTTON_CLASS.close} handler={() => navigate('/')}>
        <IoMdClose className={styles.icon} />
        Close
      </Button>
    </section>
  );
};
