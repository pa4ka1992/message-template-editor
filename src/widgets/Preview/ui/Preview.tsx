import { FC, useState } from 'react';
import { Message, VariablesEditor } from 'features';
import { ITemplate, TVariable } from 'shared';
import { CloseButton } from 'entities';
import { setInitialValues } from '../lib';
import styles from './Preview.module.scss';

type Props = {
  vars: string[];
  template: ITemplate;
  swapModal: () => void;
};

export const Preview: FC<Props> = ({ vars, template, swapModal }) => {
  const [variables, setVariables] = useState(setInitialValues(vars));

  const variablesHandler = (newValue: TVariable) => {
    const newVars = [...variables];
    const targetIdx = newVars.findIndex((varObj) => varObj.name === newValue.name);
    newVars[targetIdx] = newValue;

    setVariables(newVars);
  };

  return (
    <div className={styles.preview}>
      <h2 className={styles.header}>Message Preview</h2>

      <Message {...{ variables, template }} />
      <VariablesEditor {...{ variables, variablesHandler }} />

      <CloseButton closeHandler={swapModal}>Close</CloseButton>
    </div>
  );
};
