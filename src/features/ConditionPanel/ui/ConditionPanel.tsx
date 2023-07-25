import { FC } from 'react';
import { Button, BUTTON_CLASS } from 'shared';
import styles from './ConditionPanel.module.scss';

type Props = { conditionHandler: () => void };

export const ConditionPanel: FC<Props> = ({ conditionHandler }) => {
  return (
    <div className={styles.addCondition}>
      <h3 className={styles.header}>Add condition</h3>
      <Button buttonClass={BUTTON_CLASS.if} handler={conditionHandler}>
        if | then | else
      </Button>
    </div>
  );
};
