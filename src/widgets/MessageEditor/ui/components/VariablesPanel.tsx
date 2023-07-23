import { FC, useContext } from 'react';
import { Button, FocusContext, splitNodeText } from 'shared';

type Props = {
  vars: string[] | null;
};

export const VariablesPanel: FC<Props> = ({ vars }) => {
  const { rootElements } = useContext(FocusContext);

  if (!vars) {
    return null;
  }

  const addVariable = (varName: string) => {
    const { focusEl, headEl } = rootElements;
    const elState = focusEl || headEl;

    if (elState) {
      const { startText, endText } = splitNodeText(elState.el);
      elState.changeText(`${startText}{${varName}}${endText}`);
    }
  };

  return (
    <div>
      {vars.map((varName, index) => (
        <div key={varName}>
          <Button handler={() => addVariable(varName)}>{`{${varName}}`}</Button>
        </div>
      ))}
    </div>
  );
};
