import { FC } from 'react';
import { Button, ICondition, TemplateBlock } from 'shared';
import { ConditionBlock } from './ConditionBlock';

type Props = {
  condition: ICondition<TemplateBlock>;
  deleteCondition: (id: number) => void;
};

export const Condition: FC<Props> = ({ condition, deleteCondition }) => {
  const { ifBlock, thenBlock, elseBlock } = condition;

  const deleteHandler = () => {
    deleteCondition(condition.id);
  };
  return (
    <div>
      <Button handler={deleteHandler}>delete</Button>
      {[ifBlock, thenBlock, elseBlock].map((block) => (
        <ConditionBlock key={block.name} {...{ block }} />
      ))}
    </div>
  );
};
