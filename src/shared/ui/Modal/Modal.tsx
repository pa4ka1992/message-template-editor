import { forwardRef, ForwardRefRenderFunction, ReactNode, useEffect, useImperativeHandle, useState } from 'react';
import { CloseButton } from 'entities';
import styles from './Modal.module.scss';

type Props = {
  children: ReactNode;
};

export type ModalRef = {
  swapModal: () => void;
};

const Modal: ForwardRefRenderFunction<ModalRef, Props> = ({ children }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    swapModal: () => setIsModalOpen(!isModalOpen)
  }));

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
  }, [isModalOpen]);

  const closeHandler = () => {
    setIsModalOpen(false);
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className={styles.modal} onMouseDown={closeHandler}>
      <div className={styles.inner} onMouseDown={(e) => e.stopPropagation()}>
        <CloseButton {...{ closeHandler }} />

        {children}
      </div>
    </div>
  );
};

export default forwardRef(Modal);