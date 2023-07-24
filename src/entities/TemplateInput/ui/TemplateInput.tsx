import { FC, useContext, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { BLOCK_NAME, FocusContext, TemplateBlock, TextFocusEvent } from 'shared';
import styles from './TemplateInput.module.scss';

type Props = {
  block: TemplateBlock;
  addCondition: () => void;
};

export const TemplateInput: FC<Props> = ({ block, addCondition }) => {
  const [textValue, setTextValue] = useState(block.value);
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const { rootElements, setRootElements } = useContext(FocusContext);

  const isHead = block.name === BLOCK_NAME.head;
  const isFoot = block.name === BLOCK_NAME.foot;

  const changeText = (value: string) => {
    block.value = value;
    setTextValue(value);
  };

  useEffect(() => {
    setTextValue(block.value);
  }, [block]);

  useEffect(() => {
    if (ref.current) {
      const { headEl, footEl } = rootElements;
      const elState = {
        el: ref.current,
        addCondition,
        changeText
      };

      if (!headEl && isHead) {
        setRootElements({ ...rootElements, headEl: elState });
      }

      if (!footEl && isFoot) {
        setRootElements({ ...rootElements, footEl: elState });
      }
    }
  }, [ref]);

  const focusHandler = (e: TextFocusEvent) => {
    const elState = {
      el: e.target,
      addCondition,
      changeText
    };

    e._root = {};
    e._root.focusEl = elState;
  };

  return (
    <TextareaAutosize
      className={styles.input}
      ref={ref}
      onFocus={focusHandler}
      onChange={({ currentTarget }) => {
        changeText(currentTarget.value);
      }}
      value={textValue}
    />
  );
};
