import { FC } from 'react';
import { Dispatcher, ICondition, ITemplate, TemplateBlock } from 'shared';
import { CloseButton } from 'entities';
import { ConditionBlock } from './ConditionBlock';
import styles from './Condition.module.scss';

type Props = {
  condition: ICondition;
  setParent: Dispatcher<ITemplate | TemplateBlock>;
};

export const Condition: FC<Props> = ({ condition, setParent }) => {
  const { id } = condition;

  const closeHandler = () => {
    setParent((prev) => {
      const filteredChildren = prev.children.filter((child) => child.id !== id);

      return {
        ...prev,
        children: filteredChildren
      };
    });
  };

  const setBlock = (newBlock: TemplateBlock) => {
    setParent((prev) => {
      const updatedBlocks = condition.blocks.map((block) => {
        if (block.name === newBlock.name) {
          return block;
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

  return (
    <div className={styles.condition}>
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
