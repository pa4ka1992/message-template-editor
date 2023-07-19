import { createContext } from 'react';

type TFocusContext = {
  setElInFocus: (el: HTMLTextAreaElement) => void;
};

export const FocusContext = createContext({} as TFocusContext);
