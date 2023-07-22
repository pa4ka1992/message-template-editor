import { FC } from 'react';
import { Button } from 'shared';

type Props = { conditionHandler: () => void };

export const ConditionButton: FC<Props> = ({ conditionHandler }) => {
  return <Button handler={conditionHandler}>IF | THEN | ELSE</Button>;
};
