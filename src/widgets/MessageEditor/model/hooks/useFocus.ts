import { useState } from 'react';
import { BLOCK_NAME, ElState, FormFocusEvent, RootElements, splitNodeText, _root } from 'shared';

const INITIAL_ROOT = {
  focusEl: undefined,
  headEl: undefined
};

// Length of variables with  curly brackets template from view "{ var }"
const VAR_TEMPLATE_LENGTH = 4;

export const useFocus = () => {
  const [rootElements, setRootElements] = useState<RootElements>(INITIAL_ROOT);

  const setFocusEl = (e: FormFocusEvent) => {
    const root = e[_root];
    const newRoot = { ...rootElements };

    for (const key in root) {
      const assertionKey = key as keyof RootElements;

      newRoot[assertionKey] = root[assertionKey];
    }

    setRootElements(newRoot);
  };

  const addCondition = () => {
    const { focusEl, headEl } = rootElements;
    const elState = focusEl || headEl;

    if (elState) {
      elState.addCondition();
    }
  };

  const addVariable = async (varName: string) => {
    const { focusEl, headEl } = rootElements;
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

  const setHeadOnRender = (name: string, state: ElState) => {
    if (name === BLOCK_NAME.head && !rootElements.headEl) {
      setRootElements({ ...rootElements, headEl: state });
    }
  };

  return {
    setFocusEl,
    addCondition,
    addVariable,
    setHeadOnRender
  };
};
