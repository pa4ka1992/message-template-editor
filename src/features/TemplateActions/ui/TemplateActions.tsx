import { FC } from 'react';
import { Button } from 'shared';

type Callback = () => void;

type Props<T> = {
  save: T;
  preview: T;
  close: T;
};

export const TemplateActions: FC<Props<Callback>> = ({ save, preview, close }) => {
  return (
    <footer>
      <Button value="Save" handler={save} />
      <Button value="Preview" handler={preview} />
      <Button value="Close" handler={close} />
    </footer>
  );
};
