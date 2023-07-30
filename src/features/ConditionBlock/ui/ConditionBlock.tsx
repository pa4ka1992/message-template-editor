import { MutableRefObject, MouseEvent, useState, FC, memo } from 'react';
import { Dispatcher, ICondition, ITemplateBlock } from 'shared';
import { CloseButton } from 'entities';
import { ConditionCase } from './ConditionCase';
import styles from './ConditionBlock.module.scss';
import './ConditionBlock.scss';

type Props = {
  condition: ICondition;
  setTemplate: Dispatcher<ITemplateBlock>;
  parentRef: MutableRefObject<HTMLTextAreaElement | null>;
};

const ConditionBlock: FC<Props> = ({ condition, setTemplate, parentRef }) => {
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

  const setBlock = (newBlock: ITemplateBlock) => {
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
    <section
      className={`${styles.condition} ${isHovered ? 'ifHover' : ''}`}
      onMouseOver={overHandler}
      onMouseOut={outHandler}
    >
      <div className={styles.ranger}>
        <CloseButton {...{ closeHandler }} />
      </div>

      <div className={styles.cases}>
        {condition.blocks.map((block) => (
          <ConditionCase key={block.name} {...{ block, setBlock }} />
        ))}
      </div>
    </section>
  );
};

export default memo(ConditionBlock);
