import { Dispatch, FC, MutableRefObject, SetStateAction, useRef } from 'react';
import { TemplateActions, TemplateFields, Variables } from 'features';
import { FocusContext, CallbackSave, ITemplate, ElInFocus, Handlers } from 'shared';
import { ConditionButton } from 'entities';

type Props = {
  vars: string[];
  setVars: Dispatch<SetStateAction<string[]>>;
  templateRef: MutableRefObject<ITemplate>;
  callbackSave: CallbackSave;
};

export const MessageEditor: FC<Props> = ({ vars, setVars, templateRef, callbackSave: save }) => {
  const elInFocus = useRef<ElInFocus>(null);
  const focusHandlers = useRef<Handlers>({ addCondition: null, changeHeadText: null, changeTextFocus: null });

  const conditionHandler = () => {
    const { addCondition } = focusHandlers.current;

    if (addCondition) {
      addCondition();
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FocusContext.Provider value={{ elInFocus, focusHandlers }}>
        <Variables {...{ vars }} />

        <ConditionButton {...{ conditionHandler }} />

        <TemplateFields {...{ templateRef }} />
      </FocusContext.Provider>

      <TemplateActions {...{ save: () => save(templateRef, vars), preview: () => {}, close: () => {} }} />
    </form>
  );
};
