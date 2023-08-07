import { FC, useCallback, useRef } from 'react';
import { ITemplateBlock, useHandlers } from 'shared';
import { TemplateInput } from '_entities';
import { ConditionBlock } from '../../ConditionBlock';
import { getBlockColor } from '../lib';
import styles from './ConditionCase.module.scss';

type Props = {
  id: number;
  block: ITemplateBlock;
  setBlock: (block: ITemplateBlock) => void;
};

export const ConditionCase: FC<Props> = ({ block, setBlock, id }) => {
  const { name, value, children } = block;
  const headRef = useRef<HTMLTextAreaElement | null>(null);

  //imitates template dispatcher to provide a universal ConditionBlock component
  const setTemplate = useCallback(
    (callback: (block: ITemplateBlock) => ITemplateBlock) => {
      const newBlock = callback(block);
      setBlock(newBlock);
    },
    [setBlock]
  );

  const { changeText, addCondition } = useHandlers({
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
        </>
      ) : null}
    </div>
  );
};
