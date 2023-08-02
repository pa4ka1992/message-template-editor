import { forwardRef, ForwardRefRenderFunction } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { _focusState, CustomFocusEvent } from 'shared';
import styles from './TemplateInput.module.scss';

type Props = {
  name: string;
  value: string;
  addCondition: () => void;
  changeText: (val: string) => void;
  id?: number;
  isRoot?: boolean;
};

export const TemplateInput: ForwardRefRenderFunction<HTMLTextAreaElement, Props> = (
  { name, value, changeText, addCondition, id, isRoot },
  ref
) => {
  //bubbles all needed states for template tools buttons on focus
  const focusHandler = (e: CustomFocusEvent) => {
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
      minRows={isRoot ? 4 : 1}
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
