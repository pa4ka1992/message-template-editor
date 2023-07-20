import { ChangeEvent, FC, FocusEvent, useContext } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { FocusContext } from 'shared/context';

type Props = {
  value: string;
  handler: (text: string) => void;
};

export const TextField: FC<Props> = ({ value, handler }) => {
  const { setElInFocus } = useContext(FocusContext);

  const focusHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
    setElInFocus(e.target);
  };

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handler(e.currentTarget.value);
  };

  return <TextareaAutosize onFocus={focusHandler} value={value} onChange={changeHandler} />;
};
