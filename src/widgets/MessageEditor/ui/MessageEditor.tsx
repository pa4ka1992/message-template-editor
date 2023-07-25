import { FC } from 'react';
import { ConditionPanel, TemplateActions, VariablesPanel } from 'features';
import { FocusContext, CallbackSave, ITemplate, Modal } from 'shared';
import { Preview, TemplateFields } from 'widgets';
import { useFocus, useModal } from '../model';
import styles from './MessageEditor.module.scss';

type Props = {
  vars: string[];
  setVars: (newVars: string[]) => void;
  template: ITemplate;
  callbackSave: CallbackSave;
};

export const MessageEditor: FC<Props> = ({ vars, setVars, template, callbackSave: save }) => {
  const { focusHandler, rootElements, setRootElements } = useFocus();
  const { isModalOpen, modalHandler } = useModal();

  const conditionHandler = () => {
    const { focusEl, headEl } = rootElements;
    const elState = focusEl || headEl;

    if (elState) {
      elState.addCondition();
    }
  };

  const previewContent = <Preview {...{ vars, template, modalHandler }} />;

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()} onFocus={focusHandler}>
      <h2 className={styles.header}>Edit message</h2>

      <FocusContext.Provider value={{ rootElements, setRootElements }}>
        <VariablesPanel {...{ vars }} />

        <ConditionPanel {...{ conditionHandler }} />

        <TemplateFields {...{ template }} />
      </FocusContext.Provider>

      <TemplateActions {...{ save: () => save(template, vars), preview: modalHandler }} />
      {isModalOpen ? Modal(previewContent, modalHandler) : null}
    </form>
  );
};
