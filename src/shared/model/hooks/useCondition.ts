import { useContext, useEffect, useState } from 'react';
import { BLOCK_NAME, FocusContext, ITemplate, TemplateBlock, splitNodeText } from 'shared';
import { ConditionObj } from '../../lib';

export const useCondition = (block: TemplateBlock, template?: ITemplate) => {
  const [conditions, setConditions] = useState(block.children);
  const { rootElements } = useContext(FocusContext);

  useEffect(() => {
    setConditions(block.children);
  }, [block]);

  const deleteCondition = (id: string) => {
    const filtered = conditions.filter((condition) => condition.id !== id);
    setConditions(filtered);
    block.children = filtered;
  };

  const addCondition = () => {
    if (block.name === BLOCK_NAME.head && !block.children.length) {
      const { headEl } = rootElements;

      if (headEl && template) {
        const { startText, endText } = splitNodeText(headEl.el);
        const { changeText } = headEl;

        template.head.value = startText;
        template.foot.value = endText;
        changeText(startText);
      }
    }

    const newCondition = new ConditionObj();

    block.children = [...block.children, newCondition];
    setConditions((prev) => [...prev, newCondition]);
  };

  return { conditions, deleteCondition, addCondition };
};
