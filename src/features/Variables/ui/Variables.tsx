import { FC, useContext } from 'react';
import { uid } from 'uid';
import { Button, FocusContext, splitNodeText } from 'shared';

type Props = {
  vars: string[] | null;
};

export const Variables: FC<Props> = ({ vars }) => {
  const { elInFocus, focusHandlers } = useContext(FocusContext);

  if (!vars) {
    return null;
  }

  const addVariable = (varName: string) => {
    const { changeTextFocus } = focusHandlers.current;

    if (elInFocus.current) {
      const { startText, endText } = splitNodeText(elInFocus.current);

      if (changeTextFocus) {
        changeTextFocus(`${startText}{${varName}}${endText}`);
      }
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
