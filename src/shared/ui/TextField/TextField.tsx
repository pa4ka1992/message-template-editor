import { ChangeEvent, FocusEvent, ForwardRefRenderFunction, forwardRef, useContext } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { FocusContext } from 'shared/context';
import { FootBlock, TemplateBlock } from 'shared/model';

type Props = {
  block: TemplateBlock | FootBlock;
  addCondition?: () => void;
};

const Content: ForwardRefRenderFunction<HTMLTextAreaElement, Props> = ({ block, addCondition: addHandler }, ref) => {
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

  return <TextareaAutosize ref={ref} onFocus={focusHandler} defaultValue={block.value} onChange={changeHandler} />;
};

export const TextField = forwardRef(Content);
