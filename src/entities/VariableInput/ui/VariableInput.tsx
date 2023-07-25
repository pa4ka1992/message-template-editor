import { ChangeEvent, FC } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { TVariable } from 'shared';
import styles from './VariableInput.module.scss';

type Props = {
  variable: TVariable;
  variablesHandler: (newValue: TVariable) => void;
};

export const VariableInput: FC<Props> = ({ variable, variablesHandler }) => {
  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    variablesHandler({ name: variable.name, value });
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.varName}>{variable.name}</p>
      <TextareaAutosize className={styles.input} value={variable.value} onChange={changeHandler} />
    </div>
  );
};
