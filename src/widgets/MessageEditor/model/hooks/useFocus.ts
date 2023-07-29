import { useState } from 'react';
import { BLOCK_NAME, ElState, FormFocusEvent, RootElements, splitNodeText } from 'shared';

const initialRoot = {
  focusEl: undefined,
  headEl: undefined,
  splitEl: undefined
};

export const useFocus = () => {
  const [rootElements, setRootElements] = useState<RootElements>(initialRoot);

  const setFocusEl = (e: FormFocusEvent) => {
    const { _root } = e;
    const newRoot = { ...rootElements };

    for (const key in _root) {
      const assertionKey = key as keyof RootElements;

      newRoot[assertionKey] = _root[assertionKey];
    }

    setRootElements(newRoot);
  };

  const addCondition = async () => {
    const { focusEl, headEl } = rootElements;
    const elState = focusEl || headEl;

    if (elState) {
      await elState.addCondition();
      elState.el.focus();
    }
  };

  const addVariable = async (varName: string) => {
    const { focusEl, headEl } = rootElements;
    const elState = focusEl || headEl;

    if (elState) {
      const { startText, endText } = splitNodeText(elState.el);
      await elState.changeText(`${startText}{ ${varName.toUpperCase()} }${endText}`);
      elState.el.focus();
    }
  };

  const setElsOnRender = (name: string, state: ElState) => {
    if (name === BLOCK_NAME.head && !rootElements.headEl) {
      setRootElements({ ...rootElements, headEl: state });
    }

    if (name === BLOCK_NAME.split && !rootElements.splitEl) {
      setRootElements({ ...rootElements, splitEl: state });
    }
  };

  return {
    setFocusEl,
    addCondition,
    addVariable,
    setElsOnRender
  };
};
