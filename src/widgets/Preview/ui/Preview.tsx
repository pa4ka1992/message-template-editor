import { FC, useState } from 'react';
import { MessageView, VariablesEditor } from 'features';
import { ITemplateBlock, TVariable } from 'shared';
import { CloseButton } from 'entitiees';
import { setInitialValues } from '../lib';
import styles from './Preview.module.scss';

type Props = {
  vars: string[];
  template: ITemplateBlock;
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

      <MessageView {...{ variables, template }} />
      <VariablesEditor {...{ variables, variablesHandler }} />

      <CloseButton closeHandler={swapModal}>Close</CloseButton>
    </div>
  );
};
