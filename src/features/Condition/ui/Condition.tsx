import { FC } from 'react';
import { ICondition, TemplateBlock } from 'shared';
import { CloseButton } from 'entities';
import { ConditionBlock } from './ConditionBlock';
import styles from './Condition.module.scss';

type Props = {
  condition: ICondition<TemplateBlock>;
  deleteCondition: (id: number) => void;
};

export const Condition: FC<Props> = ({ condition, deleteCondition }) => {
  const { ifBlock, thenBlock, elseBlock } = condition;

  const closeHandler = () => {
    deleteCondition(condition.id);
  };
  return (
    <div className={styles.condition}>
      <div className={styles.ranger}>
        <CloseButton {...{ closeHandler }} />
      </div>

      <div className={styles.cases}>
        {[ifBlock, thenBlock, elseBlock].map((block) => (
          <ConditionBlock key={block.name} {...{ block }} />
        ))}
      </div>
    </div>
  );
};
