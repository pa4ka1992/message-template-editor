import { FC } from 'react';

type Props = {
  value: string;
  handler: () => void;
};

export const Button: FC<Props> = ({ value, handler }) => {
  return <button onClick={handler}>{value}</button>;
};
