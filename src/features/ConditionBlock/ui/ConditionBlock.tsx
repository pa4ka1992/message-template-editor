import { MutableRefObject, useState, FC, memo } from 'react';
import { CustomFocusEvent, ICondition, ITemplateBlock, SetTemplate, _focusMark } from 'shared';
import { CloseButton } from 'entities';
import { ConditionCase } from './ConditionCase';
import styles from './ConditionBlock.module.scss';
import './ConditionBlock.scss';

type Props = {
  condition: ICondition;
  setTemplate: SetTemplate;
  parentRef: MutableRefObject<HTMLTextAreaElement | null>;
};

const ConditionBlock: FC<Props> = ({ condition, setTemplate, parentRef }) => {
  const { id } = condition;
  const [isFocused, setIsFocused] = useState(false);

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

  const focusHandler = (e: CustomFocusEvent) => {
    if (!e[_focusMark]) {
      setIsFocused(true);
      e[_focusMark] = true;
    }
  };

  const blurHandler = (e: CustomFocusEvent) => {
    setIsFocused(false);
  };

  return (
    <section
      className={`${styles.condition} ${isFocused ? 'ifHover' : ''}`}
      onFocus={focusHandler}
      onBlur={blurHandler}
    >
      <div className={styles.ranger}>
        <CloseButton {...{ closeHandler }} />
      </div>

      <div className={styles.cases}>
        {condition.blocks.map((block) => (
          <ConditionCase key={block.name} {...{ block, setBlock, id }} />
        ))}
      </div>
    </section>
  );
};

export default memo(ConditionBlock);
