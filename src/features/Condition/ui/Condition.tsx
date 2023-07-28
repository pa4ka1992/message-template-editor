import { MutableRefObject, MouseEvent, useState } from 'react';
import { Dispatcher, ICondition, TemplateBlock } from 'shared';
import { CloseButton } from 'entities';
import { ConditionBlock } from './ConditionBlock';
import styles from './Condition.module.scss';
import './Condition.scss';

type Props<T> = {
  condition: ICondition;
  setTemplate: Dispatcher<T>;
  parentRef: MutableRefObject<HTMLTextAreaElement | null>;
};

export const Condition = <K extends TemplateBlock, D extends K>({ condition, setTemplate, parentRef }: Props<D>) => {
  const { id } = condition;
  const [isHovered, setIshovered] = useState(false);

  const closeHandler = async () => {
    await setTemplate((prev) => {
      const filteredChildren = prev.children.filter((child) => child.id !== id);

      return {
        ...prev,
        children: filteredChildren
      };
    });

    if (parentRef.current) {
      parentRef.current.focus();
    }
  };

  const setBlock = (newBlock: TemplateBlock) => {
    setTemplate((prev) => {
      const updatedBlocks = condition.blocks.map((block) => {
        if (block.name === newBlock.name) {
          return newBlock;
        }

        return block;
      });

      const updatedCondition: ICondition = { id, blocks: updatedBlocks };

      const updatedChildren = prev.children.map((child) => {
        if (child.id === condition.id) {
          return updatedCondition;
        }

        return child;
      });

      return { ...prev, children: updatedChildren };
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
          <ConditionBlock key={block.name} {...{ block, setBlock }} />
        ))}
      </div>
    </div>
  );
};
