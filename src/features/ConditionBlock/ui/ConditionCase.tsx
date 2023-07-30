import { FC, useCallback, useRef } from 'react';
import { ITemplateBlock, ConditionObj } from 'shared';
import { TemplateInput } from 'entities';
import { getBlockColor } from '../lib';
import { default as ConditionBlock } from './ConditionBlock';
import styles from './ConditionCase.module.scss';

type Props = {
  id: number;
  block: ITemplateBlock;
  setBlock: (block: ITemplateBlock) => void;
};

export const ConditionCase: FC<Props> = ({ block, setBlock, id }) => {
  const { name, value, children } = block;
  const parentRef = useRef<HTMLTextAreaElement | null>(null);

  const changeText = (val: string) => {
    setBlock({ ...block, value: val });
  };

  const addCondition = () => {
    setBlock({ ...block, children: [...children, new ConditionObj()] });
  };

  const setTemplate = useCallback(
    (callback: (block: ITemplateBlock) => ITemplateBlock) => {
      const newBlock = callback(block);
      setBlock(newBlock);
    },
    [setBlock]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <p className={styles.blockName} style={{ color: getBlockColor(name) }}>
          {name}
        </p>

        <TemplateInput ref={parentRef} {...{ name, value, changeText, addCondition, id }} />
      </div>

      {children.length ? (
        <div className={styles.children}>
          {children.map((condition, i) => (
            <ConditionBlock key={condition.id + i} {...{ condition, setTemplate, parentRef }} />
          ))}
        </div>
      ) : null}
    </div>
  );
};
