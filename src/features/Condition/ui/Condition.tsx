import { FC, useEffect, useState } from 'react';
import { Dispatcher, ICondition } from 'shared';
import { CloseButton } from 'entities';
import { ConditionBlock } from './ConditionBlock';
import styles from './Condition.module.scss';

type Props = {
  block: ICondition;
  setChildren: Dispatcher<ICondition[]>;
};

export const Condition: FC<Props> = ({ block, setChildren }) => {
  const [condition, setCondition] = useState(block);

  useEffect(() => {
    setChildren((prev) => {
      return prev.map((child) => {
        if (child.id === condition.id) {
          return condition;
        }

        return child;
      });
    });
  }, [condition]);

  const closeHandler = () => {
    setChildren((prev) => {
      const filtered = prev.filter((child) => child.id !== condition.id);

      return filtered;
    });
  };

  return (
    <div className={styles.condition}>
      <div className={styles.ranger}>
        <CloseButton {...{ closeHandler }} />
      </div>

      <div className={styles.cases}>
        {condition.fields.map((field) => (
          <ConditionBlock key={field.name} {...{ field, setCondition }} />
        ))}
      </div>
    </div>
  );
};
