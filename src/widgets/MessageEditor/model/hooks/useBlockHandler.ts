import { useContext, useEffect, useState } from 'react';
import { BLOCK_NAME, FocusContext, ITemplate, TemplateBlock, splitNodeText } from 'shared';
import { ConditionObj } from 'widgets/MessageEditor/lib/conditionConstructor';

export const useBlockHandler = (block: TemplateBlock, template?: ITemplate) => {
  const [conditions, setConditions] = useState(block.children);
  const { elInFocus, focusHandlers } = useContext(FocusContext);

  useEffect(() => {
    setConditions(block.children);
  }, [block]);

  const deleteCondition = (id: string) => {
    const filtered = conditions.filter((condition) => condition.id !== id);
    setConditions(filtered);
    block.children = filtered;
  };

  const addCondition = () => {
    /**
     * split head text when the first "if" will be pasted
     */
    if (block.name === BLOCK_NAME.head && !block.children.length) {
      if (elInFocus.current) {
        const { startText, endText } = splitNodeText(elInFocus.current);
        const { changeHeadText } = focusHandlers.current;

        if (changeHeadText && template) {
          template.foot.value = endText;
          changeHeadText(startText);
        }
      }
    }

    const newCondition = new ConditionObj();

    block.children = [...block.children, newCondition];
    setConditions((prev) => [...prev, newCondition]);
  };

  return { conditions, deleteCondition, addCondition };
};
