import { ChangeEvent, FocusEvent, ForwardRefRenderFunction, forwardRef, useContext, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { FocusContext } from 'shared/context';
import { BLOCK_NAME, TemplateBlock } from 'shared/model';

type Props = {
  block: TemplateBlock;
  addCondition: () => void;
};

const Content: ForwardRefRenderFunction<HTMLTextAreaElement, Props> = ({ block, addCondition }, ref) => {
  const { elInFocus, focusHandlers } = useContext(FocusContext);
  const [textValue, setTextValue] = useState(block.value);

  const changeTextFocus = (value: string) => {
    block.value = value;
    setTextValue(value);
  };

  useEffect(() => {
    /**
     * set the head text handler on a first render
     */
    if (block.name === BLOCK_NAME.head) {
      const changeHeadText = changeTextFocus;
      focusHandlers.current.changeHeadText = changeHeadText;
    }
  }, []);

  const focusHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
    /**
     * set node handlers to the context when it's focused
     */
    elInFocus.current = e.target;

    focusHandlers.current.addCondition = addCondition;
    focusHandlers.current.changeTextFocus = changeTextFocus;
  };

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;

    changeTextFocus(newValue);
  };

  return <TextareaAutosize ref={ref} onFocus={focusHandler} onChange={changeHandler} value={textValue} />;
};

export const TextField = forwardRef(Content);
