import { MutableRefObject } from 'react';
import { ConditionObj, splitNodeText } from 'shared/lib';
import { SetTemplate } from 'shared/model/types';

type Props = {
  setTemplate: SetTemplate;
  inputRef: MutableRefObject<HTMLTextAreaElement | null>;
};

export const useHandlers = ({ setTemplate, inputRef }: Props) => {
  const changeText = (val: string) => {
    setTemplate((prev) => ({ ...prev, value: val }));
  };

  const addCondition = () => {
    if (inputRef.current) {
      const { startText, endText } = splitNodeText(inputRef.current);

      setTemplate((prev) => {
        const newChildren = [new ConditionObj(endText), ...prev.children];

        return { ...prev, value: startText, children: newChildren };
      });
    }
  };

  return { changeText, addCondition };
};
