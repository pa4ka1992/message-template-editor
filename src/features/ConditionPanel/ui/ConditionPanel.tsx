import { FC } from 'react';
import { Button, BUTTON_CLASS } from 'shared';
import styles from './ConditionPanel.module.scss';

type Props = { addCondition: () => void };

export const ConditionPanel: FC<Props> = ({ addCondition }) => {
  return (
    <section className={styles.addCondition}>
      <h3 className={styles.header}>Add condition</h3>

      <Button buttonClass={BUTTON_CLASS.if} handler={addCondition}>
        if | then | else
      </Button>
    </section>
  );
};
