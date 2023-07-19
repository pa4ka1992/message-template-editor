import { FC } from 'react';
import { ITemplate, TextField } from 'shared';

type Props = {
  template: ITemplate | null;
};

export const TemplateFields: FC<Props> = ({ template }) => {
  return (
    <div>
      <TextField />
    </div>
  );
};
