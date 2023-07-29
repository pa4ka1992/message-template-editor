import { FC, useRef } from 'react';
import { TemplateBlock, ConditionObj, Dispatcher } from 'shared';
import { TemplateInput } from 'entities';
import { getBlockColor } from '../lib';
import { Condition } from './Condition';
import styles from './ConditionBlock.module.scss';

type Props = {
  block: TemplateBlock;
  setBlock: (block: TemplateBlock) => void;
};

export const ConditionBlock: FC<Props> = ({ block, setBlock }) => {
  const { name, value, children } = block;
  const parentRef = useRef<HTMLTextAreaElement | null>(null);

  const changeText = (val: string) => {
    setBlock({ ...block, value: val });
  };

  const addCondition = () => {
    setBlock({ ...block, children: [...children, new ConditionObj()] });
  };

  const imitateSetTemplate = (callback: (block: TemplateBlock) => TemplateBlock) => {
    const newBlock = callback(block);
    setBlock(newBlock);
  };

  const setTemplate = imitateSetTemplate as Dispatcher<TemplateBlock>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <p className={styles.blockName} style={{ color: getBlockColor(name) }}>
          {name}
        </p>

        <TemplateInput ref={parentRef} {...{ name, value, changeText, addCondition }} />
      </div>

      {children.length ? (
        <div className={styles.children}>
          {children.map((condition, i) => (
            <Condition key={condition.id + i} {...{ condition, setTemplate, parentRef }} />
          ))}
        </div>
      ) : null}
    </div>
  );
};
