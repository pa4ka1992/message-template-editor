import { MutableRefObject, useEffect } from 'react';
import { ConditionObj, splitNodeText } from 'shared/lib';
import { ITemplateBlock, SetTemplate } from 'shared/model/types';

type Props = {
  template: ITemplateBlock;
  setTemplate: SetTemplate;
  inputRef: MutableRefObject<HTMLTextAreaElement | null>;
};

export const useHandlers = ({ template, setTemplate, inputRef }: Props) => {
  const { children, value, split } = template;

  useEffect(() => {
    if (!children.length) {
      const newTemplate = {
        value: value + split,
        split: '',
        children
      };

      setTemplate((prev) => ({ ...prev, ...newTemplate }));
    }
  }, [children]);

  const changeText = (val: string) => {
    setTemplate((prev) => ({ ...prev, value: val }));
  };

  const changeSplitText = (val: string) => {
    setTemplate((prev) => ({ ...prev, split: val }));
  };

  const addCondition = () => {
    const newChildren = [...children, new ConditionObj()];

    if (!children.length && inputRef.current) {
      const { startText, endText } = splitNodeText(inputRef.current);

      setTemplate((prev) => ({ ...prev, value: startText, split: endText, children: newChildren }));
      return;
    }

    setTemplate((prev) => ({ ...prev, children: newChildren }));
  };

  return { changeText, changeSplitText, addCondition };
};
