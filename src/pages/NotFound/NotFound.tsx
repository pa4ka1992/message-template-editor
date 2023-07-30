import { FC } from 'react';
import styles from './NotFound.module.scss';

export const NotFound: FC = () => {
  return (
    <div className={styles.container}>
      <h2>404 Page not found</h2>
    </div>
  );
};
