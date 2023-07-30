import { FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ConditionPanel, ActionsPanel, VariablesPanel } from 'features';
import { CallbackSave, ITemplateBlock, Modal, ModalRef, SetTemplate } from 'shared';
import { Preview, InputArea } from 'widgets';
import { useFocus } from '../model';
import styles from './MessageEditor.module.scss';

type Props = {
  vars: string[];
  setTemplate: SetTemplate;
  template: ITemplateBlock;
  callbackSave: CallbackSave;
};

export const MessageEditor: FC<Props> = ({ vars, template, setTemplate, callbackSave }) => {
  const { setFocusEl, addCondition, addVariable, setHeadOnRender } = useFocus();
  const modalRef = useRef<ModalRef | null>(null);

  const swapModal = () => {
    modalRef.current?.swapModal();
  };

  const saveTemplate = () => callbackSave(template, vars);

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()} onFocus={setFocusEl}>
      <h2 className={styles.header}>Edit message</h2>

      <section className={styles.tools}>
        <VariablesPanel {...{ vars, addVariable }} />

        <ConditionPanel {...{ addCondition }} />
      </section>

      <InputArea {...{ template, setTemplate, setHeadOnRender }} />

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
