import { FocusEvent, useState } from 'react';
import { CustomFocusEvent, _focusMark } from 'shared';

export const useHighlightFocus = () => {
  const [isFocused, setIsFocused] = useState(false);

  const focusHandler = (e: CustomFocusEvent) => {
    if (!e[_focusMark]) {
      setIsFocused(true);
      e[_focusMark] = true;
    }
  };

  const blurHandler = (e: FocusEvent<HTMLElement>) => {
    setIsFocused(false);
  };

  return { isFocused, focusHandler, blurHandler };
};
