import { ChangeEvent, FC } from 'react';
import { TVariable } from 'shared';
import styles from './VariableInput.module.scss';

type Props = {
  variable: TVariable;
  variablesHandler: (newValue: TVariable) => void;
};

export const VariableInput: FC<Props> = ({ variable, variablesHandler }) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    variablesHandler({ name: variable.name, value });
  };

  return (
    <div className={styles.var}>
      <p className={styles.varName}>{variable.name}</p>
      <input className={styles.input} value={variable.value} onChange={changeHandler} />
    </div>
  );
};
