import { Dispatch, FC, SetStateAction, useRef } from 'react';
import { TemplateActions, TemplateFields, Variables } from 'features';
import { FocusContext, CallbackSave, ITemplate, ElInFocus, Handlers } from 'shared';
import { ConditionButton } from 'entities';
import { INITIAL_FOCUS_HANDLERS } from '../model';

type Props = {
  vars: string[];
  setVars: Dispatch<SetStateAction<string[]>>;
  template: ITemplate;
  callbackSave: CallbackSave;
};

export const MessageEditor: FC<Props> = ({ vars, setVars, template, callbackSave: save }) => {
  const elInFocus = useRef<ElInFocus>(null);
  const focusHandlers = useRef<Handlers>(INITIAL_FOCUS_HANDLERS);

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

        <TemplateFields {...{ template }} />
      </FocusContext.Provider>

      <TemplateActions {...{ save: () => save(template, vars), preview: () => {}, close: () => {} }} />
    </form>
  );
};
