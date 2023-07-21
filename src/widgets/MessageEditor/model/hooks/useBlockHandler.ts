import { useState } from 'react';
import { TemplateBlock } from 'shared';
import { ConditionObj } from 'widgets/MessageEditor/lib/conditionConstructor';

export const useBlockHandler = (ref: TemplateBlock) => {
  const [conditions, setConditions] = useState(ref.children);

  const deleteCondition = (id: string) => {
    const filtered = conditions.filter((condition) => condition.id !== id);
    setConditions(filtered);
    ref.children = filtered;
  };

  const addCondition = () => {
    setConditions((prev) => [...prev, new ConditionObj()]);
  };

  return { conditions, deleteCondition, addCondition };
};
