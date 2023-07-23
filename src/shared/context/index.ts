import { createContext } from 'react';
import { RootElements } from '../model';

export type TFocusContext = {
  rootElements: RootElements;
  setRootElements: (root: RootElements) => void;
};

export const FocusContext = createContext({} as TFocusContext);
