import { FC } from 'react';
import { VariableInput } from '_entities';
import { TVariable } from 'shared';
import styles from './VariablesEditor.module.scss';

type Props = {
  variables: TVariable[];
  variablesHandler: (newValues: TVariable) => void;
};

export const VariablesEditor: FC<Props> = ({ variables, variablesHandler }) => {
  return (
    <div className={styles.editor}>
      <h3 className={styles.header}>Variables</h3>

      <div className={styles.varList}>
        {variables.map((variable) => (
          <VariableInput key={variable.name} {...{ variable, variablesHandler }} />
        ))}
      </div>
    </div>
  );
};
