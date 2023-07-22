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
      <Button handler={save}>Save</Button>
      <Button handler={preview}>Preview</Button>
      <Button handler={close}>Close</Button>
    </footer>
  );
};
