import { FocusEvent } from 'react';

export type ElState = {
  name: string;
  el: HTMLTextAreaElement;
  addCondition: () => void;
  changeText: (value: string) => void;
};

export const _focusState = Symbol('focus_data');
export const _focusMark = Symbol('focus_mark');

export interface CustomFocusEvent extends FocusEvent<HTMLElement & HTMLTextAreaElement & HTMLFormElement> {
  [_focusState]?: ElState;
  [_focusMark]?: boolean;
}
