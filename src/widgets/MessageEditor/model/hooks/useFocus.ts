import { useState } from 'react';
import { FormFocusEvent, RootElements } from 'shared';

const initialRoot = {
  focusEl: undefined,
  headEl: undefined,
  footEl: undefined
};

export const useFocus = () => {
  const [rootElements, setRootElements] = useState<RootElements>(initialRoot);
  const focusHandler = (e: FormFocusEvent) => {
    const { _root } = e;
    const newRoot = { ...rootElements };

    for (const key in _root) {
      const assertionKey = key as keyof RootElements;

      newRoot[assertionKey] = _root[assertionKey];
    }

    setRootElements(newRoot);
  };

  return {
    focusHandler,
    rootElements,
    setRootElements: (root: RootElements) => {
      setRootElements(root);
    }
  };
};
