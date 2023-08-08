import { FC, MouseEvent, ReactNode, useRef } from 'react';
import styles from './Button.module.scss';
import './Button.scss';

type Props = {
  children: ReactNode;
  handler: () => void;
  buttonClass?: string;
  type?: 'button' | 'submit';
};

export const Button: FC<Props> = ({ children, handler, buttonClass, type = 'button' }) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  const setUpFocus = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return false;
  };

  return (
    <button
      type={type}
      ref={ref}
      className={`${styles.button} ${buttonClass}`}
      onMouseDown={setUpFocus}
      onClick={handler}
    >
      {children}
    </button>
  );
};
