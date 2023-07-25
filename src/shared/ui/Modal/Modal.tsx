import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CloseButton } from 'entities';
import styles from './Modal.module.scss';

type Props = {
  closeHandler: () => void;
  children: ReactNode;
};

const ModalWindow: FC<Props> = ({ children, closeHandler }) => {
  return (
    <div className={styles.modal} onMouseDown={closeHandler}>
      <div className={styles.inner} onMouseDown={(e) => e.stopPropagation()}>
        <CloseButton {...{ closeHandler }} />

        {children}
      </div>
    </div>
  );
};

export const Modal = (children: ReactNode, closeHandler: () => void) =>
  createPortal(<ModalWindow {...{ closeHandler }}>{children}</ModalWindow>, document.body);
