import { ChangeEvent, FC, FocusEvent, useContext } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { FocusContext } from 'shared/context';
import { FootBlock, TemplateBlock } from 'shared/model';

type Props = {
  block: TemplateBlock | FootBlock;
  addCondition?: () => void;
};

export const TextField: FC<Props> = ({ block, addCondition: addHandler }) => {
  const { elInFocus, addCondition } = useContext(FocusContext);

  const focusHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
    elInFocus.current = e.target;

    if ('children' in block && addHandler) {
      addCondition.current = { handler: addHandler };
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    block.value = e.currentTarget.value;
  };

  return <TextareaAutosize onFocus={focusHandler} defaultValue={block.value} onChange={changeHandler} />;
};
