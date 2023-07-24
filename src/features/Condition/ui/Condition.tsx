import { FC } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Button, BUTTON_COLOR, ICondition, TemplateBlock } from 'shared';
import { ConditionBlock } from './ConditionBlock';
import styles from './Condition.module.scss';

const initStyles = {
  default: BUTTON_COLOR.def,
  hover: BUTTON_COLOR.red,
  active: BUTTON_COLOR.dark
};

type Props = {
  condition: ICondition<TemplateBlock>;
  deleteCondition: (id: number) => void;
};

export const Condition: FC<Props> = ({ condition, deleteCondition }) => {
  const { ifBlock, thenBlock, elseBlock } = condition;

  const deleteHandler = () => {
    deleteCondition(condition.id);
  };
  return (
    <div className={styles.condition}>
      <div className={styles.ranger}>
        <Button {...{ initStyles }} handler={deleteHandler}>
          <IoMdClose className={styles.delete} />
        </Button>
      </div>

      <div className={styles.cases}>
        {[ifBlock, thenBlock, elseBlock].map((block) => (
          <ConditionBlock key={block.name} {...{ block }} />
        ))}
      </div>
    </div>
  );
};
