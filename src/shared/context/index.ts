import { createContext, MutableRefObject } from 'react';

type TFocusContext = {
  elInFocus: MutableRefObject<HTMLTextAreaElement | null>;
  addCondition: MutableRefObject<{
    handler: () => void;
  } | null>;
};

export const FocusContext = createContext({} as TFocusContext);
