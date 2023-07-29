import { FC } from 'react';
import { BlockHeader } from 'entities';
import { Button, BUTTON_CLASS } from 'shared';
import styles from './VariablesPanel.module.scss';

type Props = {
  vars: string[] | null;
  addVariable: (varName: string) => void;
};

export const VariablesPanel: FC<Props> = ({ vars, addVariable }) => {
  if (!vars) {
    return null;
  }

  return (
    <section className={styles.varsBar}>
      <BlockHeader>Variables</BlockHeader>

      <div className={styles.varList}>
        {vars.map((varName) => (
          <Button
            buttonClass={BUTTON_CLASS.var}
            key={varName}
            handler={() => addVariable(varName)}
          >{`{ ${varName} }`}</Button>
        ))}
      </div>
    </section>
  );
};
