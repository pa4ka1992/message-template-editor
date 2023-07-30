import { useState } from 'react';
import { ElState, FormFocusEvent, RootElements, splitNodeText, _focusState } from 'shared';

const INITIAL_ROOT = {
  focusEl: undefined,
  headEl: undefined
};

// Length of variables with  curly brackets template from view "{ var }"
const VAR_TEMPLATE_LENGTH = 4;

export const useFocus = () => {
  const [focusState, setFocusState] = useState<RootElements>(INITIAL_ROOT);

  const setFocusEl = (e: FormFocusEvent) => {
    if (e[_focusState]) {
      setFocusState((prev) => ({ ...prev, focusEl: e[_focusState] }));
    }
  };

  const addCondition = () => {
    const { focusEl, headEl } = focusState;
    const elState = focusEl || headEl;

    if (elState) {
      elState.addCondition();
    }
  };

  const addVariable = async (varName: string) => {
    const { focusEl, headEl } = focusState;
    const elState = focusEl || headEl;

    if (elState) {
      const { el } = elState;
      const { startText, endText, cursorPosition } = splitNodeText(elState.el);
      await elState.changeText(`${startText}{ ${varName.toUpperCase()} }${endText}`);
      el.focus();

      const newPosition = varName.length + cursorPosition + VAR_TEMPLATE_LENGTH;

      el.setSelectionRange(newPosition, newPosition);
    }
  };

  const setHeadOnRender = (state: ElState) => {
    if (!focusState.headEl) {
      setFocusState((prev) => ({ ...prev, headEl: state }));
    }
  };

  return {
    setFocusEl,
    addCondition,
    addVariable,
    setHeadOnRender
  };
};
