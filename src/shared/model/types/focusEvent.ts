import { FocusEvent } from 'react';

export type ElState = {
  name: string;
  el: HTMLTextAreaElement;
  addCondition: () => void;
  changeText: (value: string) => void;
};

export const _focusState = Symbol('focus_data');

export interface TextFocusEvent extends FocusEvent<HTMLTextAreaElement> {
  [_focusState]?: ElState;
}

export interface FormFocusEvent extends FocusEvent<HTMLFormElement> {
  [_focusState]?: ElState;
}
