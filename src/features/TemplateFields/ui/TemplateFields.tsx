import { FC, MutableRefObject, useEffect } from 'react';
import { uid } from 'uid';
import { Condition } from 'entities';
import { ITemplate, TextField } from 'shared';
import { useBlockHandler } from 'widgets/MessageEditor/model';

type Props = {
  template: MutableRefObject<ITemplate>;
};

export const TemplateFields: FC<Props> = ({ template }) => {
  const { head, foot } = template.current;
  const { conditions, addCondition, deleteCondition } = useBlockHandler(head);

  /**
   * split and join root text on two fields logic.
   */
  useEffect(() => {}, [conditions]);

  return (
    <div>
      <TextField {...{ block: head, addCondition }} />

      {conditions.map((condition) => (
        <Condition key={uid()} {...{ condition, deleteCondition }} />
      ))}

      {conditions?.length ? <TextField {...{ block: foot }} /> : null}
    </div>
  );
};
