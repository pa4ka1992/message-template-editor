import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, BUTTON_COLOR } from 'shared';
import styles from './TemplateActions.module.scss';

type Callback = () => void;

type Props<T> = {
  save: T;
  preview: T;
};

const initStyles = {
  hover: BUTTON_COLOR.light,
  active: BUTTON_COLOR.dark
};

export const TemplateActions: FC<Props<Callback>> = ({ save, preview }) => {
  const navigate = useNavigate();

  return (
    <footer className={styles.actions}>
      <Button initStyles={{ ...initStyles, default: BUTTON_COLOR.blue }} handler={save}>
        Save
      </Button>
      <Button initStyles={{ ...initStyles, default: BUTTON_COLOR.green }} handler={preview}>
        Preview
      </Button>
      <Button initStyles={{ ...initStyles, default: BUTTON_COLOR.red }} handler={() => navigate('/')}>
        Close
      </Button>
    </footer>
  );
};
