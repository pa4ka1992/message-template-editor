import { FC, MutableRefObject, useEffect, useState } from 'react';
import { uid } from 'uid';
import { ConditionBlock } from 'entities';
import { ITemplate, TextField } from 'shared';

type Props = {
  template: MutableRefObject<ITemplate>;
};

export const TemplateFields: FC<Props> = ({ template }) => {
  const { value, children, splitValue } = template.current;
  const [headField, setHeadField] = useState(value);
  const [footField, setFootField] = useState(splitValue);
  const [conditions, setConditions] = useState(children);

  useEffect(() => {
    if (headField !== value) {
      setHeadField(value);
    }

    if (footField !== splitValue) {
      setFootField(splitValue);
    }

    setConditions(children);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return (
    <div>
      <TextField />

      {conditions.map((condition) => (
        <ConditionBlock key={uid()} />
      ))}

      {children.length ? <TextField /> : null}
    </div>
  );
};
