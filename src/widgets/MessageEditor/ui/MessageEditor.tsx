import { FC, useRef, useState } from 'react';
import { FocusContext, CallbackSave, ITemplate, ElInFocus, Handlers, Modal } from 'shared';
import { ConditionButton } from 'entities';
import { Preview } from 'widgets';
import { INITIAL_FOCUS_HANDLERS } from '../model';
import { TemplateActions, TemplateFields, VariablesPanel } from './components';

type Props = {
  vars: string[];
  setVars: (newVars: string[]) => void;
  template: ITemplate;
  callbackSave: CallbackSave;
};

export const MessageEditor: FC<Props> = ({ vars, setVars, template, callbackSave: save }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const elInFocus = useRef<ElInFocus>(null);
  const focusHandlers = useRef<Handlers>(INITIAL_FOCUS_HANDLERS);

  const conditionHandler = () => {
    const { addCondition } = focusHandlers.current;

    if (addCondition) {
      addCondition();
    }
  };

  const modalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const previewContent = <Preview {...{ vars, template, modalHandler }} />;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FocusContext.Provider value={{ elInFocus, focusHandlers }}>
        <VariablesPanel {...{ vars }} />

        <ConditionButton {...{ conditionHandler }} />

        <TemplateFields {...{ template }} />
      </FocusContext.Provider>

      <TemplateActions {...{ save: () => save(template, vars), preview: modalHandler, close: () => {} }} />
      {isModalOpen ? Modal(previewContent, modalHandler) : null}
    </form>
  );
};
