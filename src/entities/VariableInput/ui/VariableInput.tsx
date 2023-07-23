import { ChangeEvent, FC } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { TVariable } from 'shared';

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
    <div>
      <p>{variable.name}</p>
      <TextareaAutosize value={variable.value} onChange={changeHandler} />
    </div>
  );
};
