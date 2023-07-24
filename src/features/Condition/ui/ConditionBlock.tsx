import { FC } from 'react';
import { TemplateBlock, useCondition } from 'shared';
import { TemplateInput } from 'entities';
import { Condition } from './Condition';

type Props = {
  block: TemplateBlock;
};

export const ConditionBlock: FC<Props> = ({ block }) => {
  const { conditions, addCondition, deleteCondition } = useCondition(block);

  return (
    <div style={{ paddingLeft: '20px' }}>
      <p>{block.name}</p>
      <TemplateInput {...{ block, addCondition }} />

      {conditions.map((condition, i) => (
        <Condition key={condition.id + i} {...{ condition, deleteCondition }} />
      ))}
    </div>
  );
};
