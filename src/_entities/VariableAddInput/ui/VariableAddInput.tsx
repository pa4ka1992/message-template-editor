import { FC, useEffect, useState } from 'react';
import { Button, BUTTON_CLASS, SetVars } from 'shared';
import { MAX_VARS, MAX_VAR_LENGTH, REGEX, TOOLTIP_MESSAGE } from '../constants';
import styles from './VariableAddInput.module.scss';

type Props = {
  vars: string[] | null;
  setVars: SetVars;
};

export const VariableAddInput: FC<Props> = ({ vars, setVars }) => {
  const [newVar, setNewVar] = useState('');
  const [tooltip, setTooltip] = useState('');

  useEffect(() => {
    if (tooltip) {
      setTimeout(() => setTooltip(''), 2000);
    }
  }, [tooltip]);

  const appendVariable = () => {
    if (newVar) {
      if (vars && vars.length > MAX_VARS) {
        setTooltip(TOOLTIP_MESSAGE.max);
        return;
      }

      if (newVar.length > MAX_VAR_LENGTH) {
        setTooltip(TOOLTIP_MESSAGE.length);
        return;
      }

      const isExists = vars?.some((varName) => varName === newVar);

      if (isExists) {
        setTooltip(TOOLTIP_MESSAGE.double);
        return;
      }

      if (REGEX.test(newVar)) {
        setTooltip(TOOLTIP_MESSAGE.regex);
        return;
      }

      setVars((prev) => [...prev, newVar]);
      setNewVar('');
    }
  };

  return (
    <section className={styles.form}>
      <input
        placeholder="new variable without brackets..."
        className={styles.addInput}
        onChange={(e) => {
          setNewVar(e.target.value);
          setTooltip('');
        }}
        value={newVar}
      />

      <Button buttonClass={BUTTON_CLASS.var} {...{ handler: appendVariable, type: 'submit' }}>
        Add variable
      </Button>

      {tooltip ? (
        <div className={styles.tooltip}>
          <span>{tooltip}</span>
        </div>
      ) : null}
    </section>
  );
};
