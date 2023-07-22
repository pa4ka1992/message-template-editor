import { FC } from 'react';
import { uid } from 'uid';
import { TemplateBlock, TextField } from 'shared';
import { useBlockHandler } from 'widgets/MessageEditor/model';
import { Condition } from './Condition';

type Props = {
  block: TemplateBlock;
};

export const ConditionBlock: FC<Props> = ({ block }) => {
  const { conditions, addCondition, deleteCondition } = useBlockHandler(block);

  return (
    <div style={{ paddingLeft: '20px' }}>
      <p>{block.name}</p>
      <TextField {...{ block, addCondition }} />

      {conditions.map((condition) => (
        <Condition key={uid()} {...{ condition, deleteCondition }} />
      ))}
    </div>
  );
};
