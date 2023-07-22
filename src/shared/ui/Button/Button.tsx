import { FC } from 'react';

type Props = {
  children: string;
  handler: () => void;
};

export const Button: FC<Props> = ({ children, handler }) => {
  return <button onClick={handler}>{children}</button>;
};
