import { FC } from 'react';
import { Button } from 'shared';

type Props = { conditionHandler: () => void };

export const ConditionButton: FC<Props> = ({ conditionHandler }) => {
  return <Button value="IF | THEN | ELSE" handler={conditionHandler} />;
};
