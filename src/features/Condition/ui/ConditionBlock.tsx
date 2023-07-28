import { TemplateBlock, ConditionObj, Dispatcher, TemplateBlockPartial, ICondition } from 'shared';
import { TemplateInput } from 'entities';
import { getBlockColor } from '../lib';
import { Condition } from './Condition';
import styles from './ConditionBlock.module.scss';

type Props<T> = {
  block: TemplateBlock;
  setParent: Dispatcher<T>;
  id: number;
};

type ImitateStateCallBack = (block: TemplateBlock) => TemplateBlock;

export const ConditionBlock = <K extends TemplateBlock, D extends K>({ block, setParent, id }: Props<D>) => {
  const { name, value, children } = block;

  const setBlock = (newBlock: TemplateBlockPartial | ImitateStateCallBack) => {
    setParent((prev) => {
      const curCondition = prev.children.find((child) => child.id === id);

      const updatedBlocks = curCondition?.blocks.map((block) => {
        if (block.name === name) {
          return typeof newBlock === 'function' ? newBlock(block) : { ...block, ...newBlock };
        }

        return block;
      });

      if (updatedBlocks) {
        const updatedCondition: ICondition = { id, blocks: updatedBlocks };

        const updatedChildren = prev.children.map((child) => {
          if (child.id === id) {
            return updatedCondition;
          }

          return child;
        });

        return { ...prev, children: updatedChildren };
      }

      return prev;
    });
  };

  const changeText = (val: string) => {
    setBlock({ name, value: val });
  };

  const addCondition = () => {
    setBlock({ name, children: [...children, new ConditionObj()] });
  };

  const setParentState = setBlock as Dispatcher<TemplateBlock>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <p className={styles.blockName} style={{ color: getBlockColor(name) }}>
          {name}
        </p>

        <TemplateInput {...{ name, value, changeText, addCondition }} />
      </div>

      {children.length ? (
        <div className={styles.children}>
          {children.map((condition, i) => (
            <Condition key={condition.id + i} {...{ condition, setParent: setParentState }} />
          ))}
        </div>
      ) : null}
    </div>
  );
};
