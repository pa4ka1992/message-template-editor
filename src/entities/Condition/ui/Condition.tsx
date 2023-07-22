import { FC } from 'react';
import { uid } from 'uid';
import { ICondition, TemplateBlock } from 'shared';
import { ConditionBlock } from './ConditionBlock';

type Props = {
  condition: ICondition<TemplateBlock>;
  deleteCondition: (id: string) => void;
};

export const Condition: FC<Props> = ({ condition, deleteCondition }) => {
  const { ifBlock, thenBlock, elseBlock } = condition;

  return (
    <div>
      <button onClick={() => deleteCondition(condition.id)}>delete</button>
      {[ifBlock, thenBlock, elseBlock].map((block) => (
        <ConditionBlock key={uid()} {...{ block }} />
      ))}
    </div>
  );
};
