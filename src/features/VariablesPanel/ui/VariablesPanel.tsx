import { FC } from 'react';
import { BlockHeader, VariableAddInput, VariableButton } from '_entities';
import { SetVars } from 'shared';
import styles from './VariablesPanel.module.scss';

type Props = {
  vars: string[] | null;
  setVars: SetVars;
  addVariable: (varName: string) => void;
};

export const VariablesPanel: FC<Props> = ({ vars, setVars, addVariable }) => {
  if (!vars) {
    return null;
  }

  return (
    <section className={styles.varsBar}>
      <BlockHeader>Variables</BlockHeader>

      <div className={styles.varList}>
        {vars.map((varName) => (
          <VariableButton key={varName} {...{ varName, addVariable, setVars }} />
        ))}
      </div>

      <VariableAddInput {...{ vars, setVars }} />
    </section>
  );
};
