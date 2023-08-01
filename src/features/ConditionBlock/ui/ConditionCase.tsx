import { FC, useCallback, useRef } from 'react';
import { BLOCK_NAME, ITemplateBlock, useHandlers } from 'shared';
import { TemplateInput } from 'entitiees';
import { getBlockColor } from '../lib';
import { default as ConditionBlock } from './ConditionBlock';
import styles from './ConditionCase.module.scss';

type Props = {
  id: number;
  block: ITemplateBlock;
  setBlock: (block: ITemplateBlock) => void;
};

export const ConditionCase: FC<Props> = ({ block, setBlock, id }) => {
  const { name, value, children, split } = block;
  const headRef = useRef<HTMLTextAreaElement | null>(null);

  const setTemplate = useCallback(
    (callback: (block: ITemplateBlock) => ITemplateBlock) => {
      const newBlock = callback(block);
      setBlock(newBlock);
    },
    [setBlock]
  );

  const { changeText, changeSplitText, addCondition } = useHandlers({
    template: block,
    setTemplate,
    inputRef: headRef
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <p className={styles.blockName} style={{ color: getBlockColor(name) }}>
          {name}
        </p>

        <TemplateInput ref={headRef} {...{ name, value, changeText, addCondition, id }} />
      </div>

      {children.length ? (
        <>
          <div className={styles.children}>
            {children.map((condition) => (
              <ConditionBlock key={condition.id} {...{ condition, setTemplate, headRef }} />
            ))}
          </div>

          <div className={styles.split}>
            <p className={styles.splitName} style={{ color: getBlockColor(name) }}>
              ...
            </p>
            <TemplateInput {...{ name: BLOCK_NAME.split, value: split, addCondition, changeText: changeSplitText }} />
          </div>
        </>
      ) : null}
    </div>
  );
};
