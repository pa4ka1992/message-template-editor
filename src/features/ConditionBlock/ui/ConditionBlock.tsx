import { MutableRefObject, FC, memo, useRef } from 'react';
import { BLOCK_NAME, ICondition, SetTemplate } from 'shared';
import { CloseButton, TemplateInput } from '_entities';
import { useHighlightFocus } from '../model';
import { ConditionCase } from '../../ConditionCase';
import { getAddCondition, getDeleteCondition, getSetblock } from '../lib';
import styles from './ConditionBlock.module.scss';
import './ConditionBlock.scss';

type Props = {
  condition: ICondition;
  setTemplate: SetTemplate;
  headRef: MutableRefObject<HTMLTextAreaElement | null>;
};

export const ConditionBlock: FC<Props> = ({ condition, setTemplate, headRef }) => {
  const { id, split } = condition;
  const { isFocused, focusHandler, blurHandler } = useHighlightFocus();
  const splitRef = useRef<HTMLTextAreaElement | null>(null);

  const { addCondition } = getAddCondition({ parentId: id, splitRef, setTemplate });
  const { deleteCondition } = getDeleteCondition({ parentId: id, headRef, setTemplate });
  const { setBlock } = getSetblock({ parentId: id, setTemplate });

  const changeSplitText = (newVal: string) => {
    setTemplate((prev) => {
      const newChildren = prev.children.map((child) => {
        if (child.id === id) {
          return { ...child, split: newVal };
        }

        return child;
      });

      return { ...prev, children: newChildren };
    });
  };

  return (
    <section className={`${styles.condition} `}>
      <section
        onFocus={focusHandler}
        onBlur={blurHandler}
        className={`${styles.innerCondition} ${isFocused ? 'blockFocused' : ''}`}
      >
        <div className={styles.close}>
          <CloseButton {...{ closeHandler: deleteCondition }} />
        </div>

        <div className={styles.cases}>
          {condition.blocks.map((block) => (
            <ConditionCase key={block.name} {...{ block, setBlock, id }} />
          ))}
        </div>
      </section>
      <TemplateInput
        ref={splitRef}
        {...{ name: BLOCK_NAME.split, value: split, addCondition, changeText: changeSplitText, isRoot: true }}
      />
    </section>
  );
};

export default memo(ConditionBlock);
