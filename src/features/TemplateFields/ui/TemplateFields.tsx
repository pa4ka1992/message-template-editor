import { FC, MutableRefObject, useCallback, useEffect, useState, Dispatch, SetStateAction } from 'react';
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

  /**
   * split and join root text on two fields logic.
   */
  useEffect(() => {}, [conditions]);

  const textFieldHandler = useCallback(
    (dispatcher: Dispatch<SetStateAction<string>>, field: 'value' | 'splitValue') =>
      (text: string): void => {
        dispatcher(text);
        template.current[field] = text;
      },
    [template]
  );

  const conditionsHandler = useCallback(() => {
    setConditions(conditions);
  }, [conditions]);

  return (
    <div>
      <TextField {...{ value: headField, handler: textFieldHandler(setHeadField, 'value') }} />

      {conditions.map((condition) => (
        <ConditionBlock key={uid()} {...{ condition, conditionsHandler }} />
      ))}

      {conditions.length ? (
        <TextField {...{ value: footField || '', handler: textFieldHandler(setFootField, 'splitValue') }} />
      ) : null}
    </div>
  );
};
