import { FC, ReactNode, useRef } from 'react';
import styles from './Button.module.scss';
import './Button.scss';

type Props = {
  children: ReactNode;
  handler: () => void;
  buttonClass?: string;
};

export const Button: FC<Props> = ({ children, handler, buttonClass }) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <button ref={ref} className={`${styles.button} ${buttonClass}`} onClick={handler}>
      {children}
    </button>
  );
};
