import { MutableRefObject } from 'react';
import { ConditionObj, ICondition, SetTemplate, splitNodeText } from 'shared';

type Props = {
  parentId: number;
  setTemplate: SetTemplate;
  splitRef: MutableRefObject<HTMLTextAreaElement | null>;
};

export const getAddCondition = (props: Props) => {
  const { parentId, setTemplate, splitRef } = props;

  const addCondition = () => {
    if (splitRef.current) {
      const { startText, endText } = splitNodeText(splitRef.current);

      setTemplate((prev) => {
        const newChildren = prev.children.reduce((accumChildren: ICondition[], child) => {
          if (child.id === parentId) {
            const updatedCurrSplit = { ...child, split: startText };

            accumChildren.push(updatedCurrSplit, new ConditionObj(endText));

            return accumChildren;
          }

          accumChildren.push(child);

          return accumChildren;
        }, []);

        return { ...prev, children: newChildren };
      });
    }
  };

  return { addCondition };
};
