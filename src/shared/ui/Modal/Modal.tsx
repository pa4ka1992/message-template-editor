import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  closeHandler: () => void;
  children: ReactNode;
};

const ModalWindow: FC<Props> = ({ children, closeHandler }) => {
  return (
    <div onClick={closeHandler}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export const Modal = (children: ReactNode, closeHandler: () => void) =>
  createPortal(<ModalWindow {...{ closeHandler }}>{children}</ModalWindow>, document.body);
