import { useState, ChangeEvent, FC, FocusEvent, useContext } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { FocusContext } from 'shared/context';

export const TextField: FC = () => {
  const { setElInFocus } = useContext(FocusContext);
  const [value, setValue] = useState('');

  const focusHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
    setElInFocus(e.target);
  };

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  };

  return <TextareaAutosize onFocus={focusHandler} value={value} onChange={changeHandler} />;
};
