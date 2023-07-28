import { Dispatcher, ICondition, TemplateBlock } from 'shared';
import { CloseButton } from 'entities';
import { ConditionBlock } from './ConditionBlock';
import styles from './Condition.module.scss';

type Props<T> = {
  condition: ICondition;
  setParent: Dispatcher<T>;
};

export const Condition = <K extends TemplateBlock, D extends K>({ condition, setParent }: Props<D>) => {
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

  return (
    <div className={styles.condition}>
      <div className={styles.ranger}>
        <CloseButton {...{ closeHandler }} />
      </div>

      <div className={styles.cases}>
        {condition.blocks.map((block) => (
          <ConditionBlock key={block.name} {...{ block, setParent, id }} />
        ))}
      </div>
    </div>
  );
};
