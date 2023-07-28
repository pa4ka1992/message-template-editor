import { MouseEvent, useState } from 'react';
import { Dispatcher, ICondition, TemplateBlock } from 'shared';
import { CloseButton } from 'entities';
import { ConditionBlock } from './ConditionBlock';
import styles from './Condition.module.scss';
import './Condition.scss';

type Props<T> = {
  condition: ICondition;
  setParent: Dispatcher<T>;
};

export const Condition = <K extends TemplateBlock, D extends K>({ condition, setParent }: Props<D>) => {
  const { id } = condition;
  const [isHovered, setIshovered] = useState(false);

  const closeHandler = () => {
    setParent((prev) => {
      const filteredChildren = prev.children.filter((child) => child.id !== id);

      return {
        ...prev,
        children: filteredChildren
      };
    });
  };

  const overHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIshovered(true);
  };

  const outHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIshovered(false);
  };

  return (
    <div
      className={`${styles.condition} ${isHovered ? 'ifHover' : ''}`}
      onMouseOver={overHandler}
      onMouseOut={outHandler}
    >
      <div className={styles.ranger}>
        <CloseButton {...{ closeHandler }} />
      </div>

      <div className={styles.cases}>
        {condition.blocks.map((block) => (
          <ConditionBlock key={block.name} {...{ block, setParent, id }} />
        ))}
      </div>
    </div>
  );
};
