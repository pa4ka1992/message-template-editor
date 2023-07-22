import { FC, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Message } from 'entities';
import { Button, ITemplate, TVariable } from 'shared';
import { VariablesEditor } from 'features';
import { setInitialValues } from '../lib';

type Props = {
  vars: string[];
  template: ITemplate;
  closeHandler: () => void;
};

export const Preview: FC<Props> = ({ vars, template, closeHandler }) => {
  const [variables, setVariables] = useState(setInitialValues(vars));

  const variablesHandler = (newValue: TVariable) => {
    const newVars = [...variables];
    const targetIdx = newVars.findIndex((varObj) => varObj.name === newValue.name);
    newVars[targetIdx] = newValue;

    setVariables(newVars);
  };

  return (
    <>
      <h2>Message Preview</h2>
      <AiOutlineCloseCircle onClick={closeHandler} />

      <Message {...{ variables, template }} />
      <VariablesEditor {...{ variables, variablesHandler }} />

      <Button handler={closeHandler}>Close</Button>
    </>
  );
};
