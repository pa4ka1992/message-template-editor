import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, BUTTON_CLASS } from 'shared';
import styles from './TemplateActions.module.scss';

type Callback = () => void;

type Props<T> = {
  save: T;
  preview: T;
};

export const TemplateActions: FC<Props<Callback>> = ({ save, preview }) => {
  const navigate = useNavigate();

  return (
    <footer className={styles.actions}>
      <Button buttonClass={BUTTON_CLASS.save} handler={save}>
        Save
      </Button>
      <Button buttonClass={BUTTON_CLASS.preview} handler={preview}>
        Preview
      </Button>
      <Button buttonClass={BUTTON_CLASS.close} handler={() => navigate('/')}>
        Close
      </Button>
    </footer>
  );
};
