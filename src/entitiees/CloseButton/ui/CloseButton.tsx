import { FC, ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Button, BUTTON_CLASS } from 'shared';
import styles from './CloseButton.module.scss';

type Props = {
  children?: ReactNode;
  closeHandler: () => void;
};

export const CloseButton: FC<Props> = ({ children, closeHandler }) => {
  return (
    <Button buttonClass={BUTTON_CLASS.xMark} handler={closeHandler}>
      {children ? children : <IoMdClose className={styles.icon} />}
    </Button>
  );
};
