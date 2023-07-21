import { Dispatch, FC, MutableRefObject, SetStateAction, useRef } from 'react';
import { TemplateActions, TemplateFields, Variables } from 'features';
import { FocusContext, CallbackSave, ITemplate } from 'shared';
import { ConditionButton } from 'entities';

type Props = {
  vars: string[];
  setVars: Dispatch<SetStateAction<string[]>>;
  templateRef: MutableRefObject<ITemplate>;
  callbackSave: CallbackSave;
};

export const MessageEditor: FC<Props> = ({ vars, setVars, templateRef, callbackSave: save }) => {
  const elInFocus = useRef<HTMLTextAreaElement | null>(null);
  const addCondition = useRef<{ handler: () => void } | null>(null);

  const conditionHandler = () => {
    if (addCondition.current) {
      addCondition.current.handler();
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FocusContext.Provider value={{ elInFocus, addCondition }}>
        <Variables {...{ vars }} />

        <ConditionButton {...{ conditionHandler }} />

        <TemplateFields {...{ templateRef }} />
      </FocusContext.Provider>

      <TemplateActions {...{ save: () => save(templateRef, vars), preview: () => {}, close: () => {} }} />
    </form>
  );
};
