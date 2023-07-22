import { FC, MutableRefObject, useContext, useEffect, useRef } from 'react';
import { uid } from 'uid';
import { Condition } from 'entities';
import { FocusContext, ITemplate, TextField } from 'shared';
import { useBlockHandler } from 'widgets/MessageEditor/model';

type Props = {
  templateRef: MutableRefObject<ITemplate>;
};

export const TemplateFields: FC<Props> = ({ templateRef }) => {
  const { head, foot } = templateRef.current;
  const headRef = useRef<HTMLTextAreaElement | null>(null);
  const { conditions, addCondition, deleteCondition } = useBlockHandler(head, templateRef.current);
  const { elInFocus, focusHandlers } = useContext(FocusContext);

  useEffect(() => {
    /**
     * merge the root text on "if's" removal
     */
    if (!conditions.length) {
      /**
       * force focus on the head field after all "if's" had been removed
       */
      const headNode = headRef.current;
      const headChanger = focusHandlers.current.changeHeadText;

      elInFocus.current = headNode;
      focusHandlers.current.addCondition = addCondition;
      focusHandlers.current.changeTextFocus = headChanger;

      /**
       * join head and foot values after all "if's" removal
       */
      const { changeHeadText } = focusHandlers.current;

      if (changeHeadText) {
        const contatinatedHead = head.value + foot.value;
        changeHeadText(contatinatedHead);
        foot.value = '';
      }
    }
  }, [conditions]);

  return (
    <div>
      <TextField ref={headRef} {...{ block: head, addCondition }} />

      {conditions.map((condition) => (
        <Condition key={uid()} {...{ condition, deleteCondition }} />
      ))}

      {conditions.length ? <TextField {...{ block: foot, addCondition }} /> : null}
    </div>
  );
};
