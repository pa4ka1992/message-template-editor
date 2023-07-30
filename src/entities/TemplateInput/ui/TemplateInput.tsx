import { forwardRef, ForwardRefRenderFunction } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { _focusState, BLOCK_NAME, TextFocusEvent } from 'shared';
import styles from './TemplateInput.module.scss';

type Props = {
  name: string;
  value: string;
  addCondition: () => void;
  changeText: (val: string) => void;
  id?: number;
};

export const TemplateInput: ForwardRefRenderFunction<HTMLTextAreaElement, Props> = (
  { name, value, changeText, addCondition, id },
  ref
) => {
  const isRootEl = [BLOCK_NAME.head, BLOCK_NAME.split].some((blockName) => blockName === name);

  const focusHandler = (e: TextFocusEvent) => {
    const elState = {
      name: id ? `${name} id${id}` : name,
      el: e.target,
      addCondition,
      changeText
    };

    e[_focusState] = { ...elState };
  };

  return (
    <TextareaAutosize
      minRows={isRootEl ? 5 : 1}
      className={styles.input}
      ref={ref}
      onFocus={focusHandler}
      onChange={({ currentTarget }) => {
        changeText(currentTarget.value);
      }}
      value={value}
    />
  );
};

export default forwardRef(TemplateInput);
