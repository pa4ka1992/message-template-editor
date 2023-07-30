import { useState } from 'react';
import { ElState, CustomFocusEvent, splitNodeText, _focusState } from 'shared';

// Length of variables with  curly brackets template from view "{ var }"
const VAR_TEMPLATE_LENGTH = 4;

export const useFocus = () => {
  const [focusState, setFocusState] = useState<ElState | undefined>();

  const setFocusEl = (e: CustomFocusEvent) => {
    const newFocus = e[_focusState];
    if (newFocus) {
      // if (newFocus.name !== focusState?.name) {
      setFocusState(newFocus);
      // }
    }
  };

  const addCondition = () => {
    if (focusState) {
      focusState.addCondition();
    }
  };

  const addVariable = async (varName: string) => {
    if (focusState) {
      const { el } = focusState;
      const { startText, endText, cursorPosition } = splitNodeText(el);
      await focusState.changeText(`${startText}{ ${varName.toUpperCase()} }${endText}`);
      el.focus();

      const newPosition = varName.length + cursorPosition + VAR_TEMPLATE_LENGTH;

      el.setSelectionRange(newPosition, newPosition);
    }
  };

  const setHeadOnRender = (newState: ElState) => {
    if (!focusState) {
      setFocusState(newState);
    }
  };

  return {
    setFocusEl,
    addCondition,
    addVariable,
    setHeadOnRender
  };
};
