import { FC } from 'react';
import { ISubCondition, ConditionRow } from 'shared';

type Props = {
  condition: ISubCondition<ConditionRow>;
  conditionsHandler: () => void;
};

export const ConditionBlock: FC<Props> = ({ condition, conditionsHandler }) => {
  return <div>ConditionBlock</div>;
};
