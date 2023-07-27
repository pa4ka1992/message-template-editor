import { FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ConditionPanel, ActionsPanel, VariablesPanel } from 'features';
import { CallbackSave, Dispatcher, ITemplate, Modal, ModalRef } from 'shared';
import { Preview, InputArea } from 'widgets';
import { useFocus } from '../model';
import styles from './MessageEditor.module.scss';

type Props = {
  vars: string[];
  setTemplate: Dispatcher<ITemplate>;
  template: ITemplate;
  callbackSave: CallbackSave;
};

export const MessageEditor: FC<Props> = ({ vars, template, setTemplate, callbackSave }) => {
  const { setFocusEl, addCondition, addVariable, setElsOnRender } = useFocus();
  const modalRef = useRef<ModalRef | null>(null);

  const swapModal = () => {
    modalRef.current?.swapModal();
  };

  const saveTemplate = () => callbackSave(template, vars);

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()} onFocus={setFocusEl}>
      <h2 className={styles.header}>Edit message</h2>

      <VariablesPanel {...{ vars, addVariable }} />

      <ConditionPanel {...{ addCondition }} />

      <InputArea {...{ template, setTemplate, setElsOnRender }} />

      <ActionsPanel {...{ saveTemplate, swapModal }} />

      {createPortal(
        <Modal ref={modalRef}>
          <Preview {...{ vars, template, swapModal }} />
        </Modal>,
        document.body
      )}
    </form>
  );
};
