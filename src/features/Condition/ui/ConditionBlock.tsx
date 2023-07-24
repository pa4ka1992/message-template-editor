import { FC } from 'react';
import { TemplateBlock, useCondition } from 'shared';
import { TemplateInput } from 'entities';
import { Condition } from './Condition';
import styles from './ConditionBlock.module.scss';

type Props = {
  block: TemplateBlock;
};

export const ConditionBlock: FC<Props> = ({ block }) => {
  const { conditions, addCondition, deleteCondition } = useCondition(block);

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <p className={styles.blockName}>{block.name}</p>
        <TemplateInput {...{ block, addCondition }} />
      </div>

      <div className={styles.children}>
        {conditions.map((condition, i) => (
          <Condition key={condition.id + i} {...{ condition, deleteCondition }} />
        ))}
      </div>
    </div>
  );
};
