import { FC, useContext } from 'react';
import { BlockHeader } from 'entities';
import { Button, BUTTON_CLASS, FocusContext, splitNodeText } from 'shared';
import styles from './VariablesPanel.module.scss';

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
      elState.changeText(`${startText}{ ${varName.toUpperCase()} }${endText}`);
    }
  };

  return (
    <div className={styles.varsBar}>
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
    </div>
  );
};
