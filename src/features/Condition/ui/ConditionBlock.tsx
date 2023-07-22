import { FC } from 'react';
import { uid } from 'uid';
import { TemplateBlock, useBlockHandler } from 'shared';
import { TemplateInput } from 'entities';
import { Condition } from './Condition';

type Props = {
  block: TemplateBlock;
};

export const ConditionBlock: FC<Props> = ({ block }) => {
  const { conditions, addCondition, deleteCondition } = useBlockHandler(block);

  return (
    <div style={{ paddingLeft: '20px' }}>
      <p>{block.name}</p>
      <TemplateInput {...{ block, addCondition }} />

      {conditions.map((condition) => (
        <Condition key={uid()} {...{ condition, deleteCondition }} />
      ))}
    </div>
  );
};
