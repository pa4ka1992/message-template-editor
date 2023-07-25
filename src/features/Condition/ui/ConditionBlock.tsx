import { FC } from 'react';
import { TemplateBlock, useCondition } from 'shared';
import { TemplateInput } from 'entities';
import { getBlockColor } from '../lib';
import { Condition } from './Condition';
import styles from './ConditionBlock.module.scss';

type Props = {
  block: TemplateBlock;
};

export const ConditionBlock: FC<Props> = ({ block }) => {
  const { conditions, addCondition, deleteCondition } = useCondition(block);

  const children = () => {
    return (
      <div className={styles.children}>
        {conditions.map((condition, i) => (
          <Condition key={condition.id + i} {...{ condition, deleteCondition }} />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <p className={styles.blockName} style={{ color: getBlockColor(block.name) }}>
          {block.name}
        </p>

        <TemplateInput {...{ block, addCondition }} />
      </div>

      {conditions.length ? children() : null}
    </div>
  );
};
