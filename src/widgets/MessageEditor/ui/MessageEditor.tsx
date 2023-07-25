import { FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ConditionPanel, TemplateActions, VariablesPanel } from 'features';
import { FocusContext, CallbackSave, ITemplate, Modal, ModalRef } from 'shared';
import { Preview, TemplateFields } from 'widgets';
import { useFocus } from '../model';
import styles from './MessageEditor.module.scss';

type Props = {
  vars: string[];
  setVars: (newVars: string[]) => void;
  template: ITemplate;
  callbackSave: CallbackSave;
};

export const MessageEditor: FC<Props> = ({ vars, setVars, template, callbackSave }) => {
  const { focusHandler, rootElements, setRootElements } = useFocus();
  const modalRef = useRef<ModalRef | null>(null);

  const addCondition = () => {
    const { focusEl, headEl } = rootElements;
    const elState = focusEl || headEl;

    if (elState) {
      elState.addCondition();
    }
  };

  const swapModal = () => {
    modalRef.current?.swapModal();
  };

  const saveTemplate = () => callbackSave(template, vars);

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()} onFocus={focusHandler}>
      <h2 className={styles.header}>Edit message</h2>

      <FocusContext.Provider value={{ rootElements, setRootElements }}>
        <VariablesPanel {...{ vars }} />

        <ConditionPanel {...{ addCondition }} />

        <TemplateFields {...{ template }} />
      </FocusContext.Provider>

      <TemplateActions {...{ saveTemplate, swapModal }} />

      {createPortal(
        <Modal ref={modalRef}>
          <Preview {...{ vars, template, swapModal }} />
        </Modal>,
        document.body
      )}
    </form>
  );
};
