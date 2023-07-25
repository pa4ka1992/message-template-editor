import { FC } from 'react';
import styles from './BlockHeader.module.scss';

type Props = {
  children: string;
};

export const BlockHeader: FC<Props> = ({ children }) => {
  return <h3 className={styles.header}>{children}</h3>;
};
