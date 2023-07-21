import { FC, MutableRefObject, useEffect, useRef } from 'react';
import { uid } from 'uid';
import { Condition } from 'entities';
import { ITemplate, TextField } from 'shared';
import { useBlockHandler } from 'widgets/MessageEditor/model';

type Props = {
  templateRef: MutableRefObject<ITemplate>;
};

export const TemplateFields: FC<Props> = ({ templateRef }) => {
  const { head, foot } = templateRef.current;
  const { conditions, addCondition, deleteCondition } = useBlockHandler(head);
  const headRef = useRef<HTMLTextAreaElement | null>(null);
  const footRef = useRef<HTMLTextAreaElement | null>(null);

  /**
   * split and join root text on two fields logic.
   */
  useEffect(() => {}, [conditions]);

  return (
    <div>
      <TextField ref={headRef} {...{ block: head, addCondition }} />

      {conditions.map((condition) => (
        <Condition key={uid()} {...{ condition, deleteCondition }} />
      ))}

      {conditions?.length ? <TextField ref={footRef} {...{ block: foot }} /> : null}
    </div>
  );
};
