import { FC, useState } from 'react';
import { FocusContext, CallbackSave, ITemplate, Modal } from 'shared';
import { ConditionButton } from 'entities';
import { Preview } from 'widgets';
import { useFocus } from '../model';
import { TemplateActions, TemplateFields, VariablesPanel } from './components';

type Props = {
  vars: string[];
  setVars: (newVars: string[]) => void;
  template: ITemplate;
  callbackSave: CallbackSave;
};

export const MessageEditor: FC<Props> = ({ vars, setVars, template, callbackSave: save }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { focusHandler, rootElements, setRootElements } = useFocus();

  const conditionHandler = () => {
    const { focusEl, headEl } = rootElements;
    const elState = focusEl || headEl;

    if (elState) {
      elState.addCondition();
    }
  };

  const modalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const previewContent = <Preview {...{ vars, template, modalHandler }} />;

  return (
    <form onSubmit={(e) => e.preventDefault()} onFocus={focusHandler}>
      <FocusContext.Provider value={{ rootElements, setRootElements }}>
        <VariablesPanel {...{ vars }} />

        <ConditionButton {...{ conditionHandler }} />

        <TemplateFields {...{ template }} />
      </FocusContext.Provider>

      <TemplateActions {...{ save: () => save(template, vars), preview: modalHandler, close: () => {} }} />
      {isModalOpen ? Modal(previewContent, modalHandler) : null}
    </form>
  );
};
