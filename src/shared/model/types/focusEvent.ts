import { FocusEvent } from 'react';

export type ElState = {
  el: HTMLTextAreaElement;
  addCondition: () => void;
  changeText: (value: string) => void;
};

export type RootElements = {
  focusEl?: ElState;
  headEl?: ElState;
  splitEl?: ElState;
};

export interface TextFocusEvent extends FocusEvent<HTMLTextAreaElement> {
  _root: RootElements;
}

export interface FormFocusEvent extends FocusEvent<HTMLFormElement> {
  _root: RootElements;
}
