import { createContext, MutableRefObject } from 'react';

export type ElInFocus = HTMLTextAreaElement | null;

export type Handlers = {
  addCondition: (() => void) | null;
  changeHeadText: ((value: string) => void) | null;
  changeTextFocus: ((value: string) => void) | null;
};

export type TFocusContext = {
  elInFocus: MutableRefObject<ElInFocus>;
  focusHandlers: MutableRefObject<Handlers>;
};

export const FocusContext = createContext({} as TFocusContext);
