import { FC, ReactNode, useEffect, useRef } from 'react';
import { BUTTON_COLOR } from '../constants';
import styles from './Button.module.scss';

type Props = {
  children: ReactNode;
  handler: () => void;
  initStyles?: {
    default: string;
    hover: string;
    active: string;
  };
};

const defStyles = {
  default: BUTTON_COLOR.def,
  hover: BUTTON_COLOR.light,
  active: BUTTON_COLOR.dark
};

export const Button: FC<Props> = ({ children, handler, initStyles = defStyles }) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.setProperty('--default', `var(${initStyles.default})`);
      ref.current.style.setProperty('--hover', `var(${initStyles.hover})`);
      ref.current.style.setProperty('--active', `var(${initStyles.active})`);
    }
  }, [ref]);

  return (
    <button ref={ref} className={styles.button} onClick={handler}>
      {children}
    </button>
  );
};
