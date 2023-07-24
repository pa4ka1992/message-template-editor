import { FC, useContext } from 'react';
import { Button, BUTTON_COLOR, FocusContext, splitNodeText } from 'shared';
import styles from './VariablesPanel.module.scss';

const initStyles = {
  default: BUTTON_COLOR.def,
  hover: BUTTON_COLOR.light,
  active: BUTTON_COLOR.green
};

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
      elState.changeText(`${startText}{ ${varName} }${endText}`);
    }
  };

  return (
    <div className={styles.varsBar}>
      <h3 className={styles.header}>Variables</h3>
      <div className={styles.varList}>
        {vars.map((varName) => (
          <Button {...{ initStyles }} key={varName} handler={() => addVariable(varName)}>{`{ ${varName} }`}</Button>
        ))}
      </div>
    </div>
  );
};
