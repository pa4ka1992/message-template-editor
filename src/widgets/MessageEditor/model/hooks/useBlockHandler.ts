import { useContext, useState } from 'react';
import { BLOCK_NAME, FocusContext, ITemplate, TemplateBlock, splitNodeText } from 'shared';
import { ConditionObj } from 'widgets/MessageEditor/lib/conditionConstructor';

export const useBlockHandler = (ref: TemplateBlock, template: ITemplate | null = null) => {
  const [conditions, setConditions] = useState(ref.children);
  const { elInFocus, focusHandlers } = useContext(FocusContext);

  const deleteCondition = (id: string) => {
    const filtered = conditions.filter((condition) => condition.id !== id);
    setConditions(filtered);
    ref.children = filtered;
  };

  const addCondition = () => {
    /**
     * split head text when the first "if" will be pasted
     */
    if (ref.name === BLOCK_NAME.head && !ref.children.length) {
      if (elInFocus.current) {
        const { startText, endText } = splitNodeText(elInFocus.current);
        const { changeHeadText } = focusHandlers.current;

        if (changeHeadText && template) {
          template.head.value = startText;
          template.foot.value = endText;
          changeHeadText(startText);
        }
      }
    }

    const newCondition = new ConditionObj();

    ref.children = [...ref.children, newCondition];
    setConditions((prev) => [...prev, newCondition]);
  };

  return { conditions, deleteCondition, addCondition };
};
