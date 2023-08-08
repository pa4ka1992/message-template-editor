import { useCallback, useState } from 'react';
import { ElState, CustomFocusEvent, splitNodeText, _focusState } from 'shared';

//additional length of variables with curly brackets template from view "{var}"
const VAR_TEMPLATE_LENGTH = 2;

export const useFocus = () => {
  const [focusState, setFocusState] = useState<ElState | undefined>();
  const [focusHead, setFocusHead] = useState<ElState | undefined>();

  const setFocusEl = (e: CustomFocusEvent) => {
    const newFocus = e[_focusState];
    if (newFocus) {
      setFocusState(newFocus);
    }
  };

  const addCondition = async () => {
    const focusEl = focusState || focusHead;

    if (focusEl) {
      await focusEl.addCondition();
      focusEl.el.blur();
      focusEl.el.focus({ preventScroll: true });
    }
  };

  const addVariable = useCallback(
    async (varName: string) => {
      const focusEl = focusState || focusHead;

      if (focusEl) {
        const { el } = focusEl;
        const { startText, endText, cursorPosition } = splitNodeText(el);
        await focusEl.changeText(`${startText}{${varName.toUpperCase()}}${endText}`);
        el.blur();
        el.focus({ preventScroll: true });

        const newPosition = varName.length + cursorPosition + VAR_TEMPLATE_LENGTH;

        el.setSelectionRange(newPosition, newPosition);
      }
    },
    [focusState, focusHead]
  );

  const setHeadOnRender = (newState: ElState) => {
    setFocusHead(newState);
  };

  return {
    setFocusEl,
    addCondition,
    addVariable,
    setHeadOnRender
  };
};
