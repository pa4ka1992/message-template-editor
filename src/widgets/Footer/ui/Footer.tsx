import { FC } from 'react';
import { uid } from 'uid';
import { Button } from 'shared';
import { FOOTER_BUTTONS } from '../constants';

export const Footer: FC = () => {
  return (
    <footer>
      {FOOTER_BUTTONS.map((button) => (
        <Button key={uid()} {...button} />
      ))}
    </footer>
  );
};
