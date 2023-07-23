import { FC, useContext, useEffect, useRef } from 'react';
import { uid } from 'uid';
import { TemplateInput } from 'entities';
import { FocusContext, ITemplate, useCondition } from 'shared';
import { Condition } from 'features';

type Props = {
  template: ITemplate;
};

export const TemplateFields: FC<Props> = ({ template }) => {
  const { head, foot } = template;
  const headRef = useRef<HTMLTextAreaElement | null>(null);
  const { conditions, addCondition, deleteCondition } = useCondition(head, template);
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
      <TemplateInput ref={headRef} {...{ block: head, addCondition }} />

      {conditions.map((condition) => (
        <Condition key={uid()} {...{ condition, deleteCondition }} />
      ))}

      {conditions.length ? <TemplateInput {...{ block: foot, addCondition }} /> : null}
    </div>
  );
};
