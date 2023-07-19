import { FC } from 'react';
import { uid } from 'uid';
import { Button } from 'shared';

type Props = {
  vars: string[] | null;
};

export const Variables: FC<Props> = ({ vars }) => {
  if (!vars) {
    return null;
  }

  return (
    <div>
      {vars.map((varName, index) => (
        <div key={uid()}>
          <Button
            value={`{${varName}}`}
            handler={() => {
              // console.log(varName);
            }}
          />
          {index === vars.length - 1 ? null : ','}
        </div>
      ))}
    </div>
  );
};
