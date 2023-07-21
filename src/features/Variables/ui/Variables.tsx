import { FC, useContext } from 'react';
import { uid } from 'uid';
import { Button, FocusContext } from 'shared';

type Props = {
  vars: string[] | null;
};

export const Variables: FC<Props> = ({ vars }) => {
  const { elInFocus } = useContext(FocusContext);

  if (!vars) {
    return null;
  }

  const addVariable = (varName: string) => {
    if (elInFocus.current) {
      elInFocus.current.textContent = 'asdas';
    }
  };

  return (
    <div>
      {vars.map((varName, index) => (
        <div key={uid()}>
          <Button value={`{${varName}}`} handler={() => addVariable(varName)} />
          {index === vars.length - 1 ? null : ','}
        </div>
      ))}
    </div>
  );
};
