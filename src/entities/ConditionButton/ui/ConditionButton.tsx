import { FC } from 'react';
import { Button, BUTTON_COLOR } from 'shared';
import styles from './ConditionButton.module.scss';

type Props = { conditionHandler: () => void };

const initStyles = {
  default: BUTTON_COLOR.def,
  hover: BUTTON_COLOR.light,
  active: BUTTON_COLOR.blue
};

export const ConditionButton: FC<Props> = ({ conditionHandler }) => {
  return (
    <div className={styles.addCondition}>
      <h3 className={styles.header}>Add condition</h3>
      <Button {...{ initStyles }} handler={conditionHandler}>
        if | then | else
      </Button>
    </div>
  );
};
