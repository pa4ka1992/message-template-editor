import { FC } from 'react';
import { uid } from 'uid';
import { VariableInput } from 'entities';
import { TVariable } from 'shared';

type Props = {
  variables: TVariable[];
  variablesHandler: (newValues: TVariable) => void;
};

export const VariablesEditor: FC<Props> = ({ variables, variablesHandler }) => {
  return (
    <div>
      <h3>Variables</h3>

      {variables.map((variable) => (
        <VariableInput key={uid()} {...{ variable, variablesHandler }} />
      ))}
    </div>
  );
};
