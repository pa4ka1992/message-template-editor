import { FC, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ConditionPanel, ActionsPanel, VariablesPanel } from 'features';
import { CallbackSave, ITemplateBlock, Modal, ModalRef, SetTemplate, SetVars } from 'shared';
import { Preview, InputArea } from 'widgets';
import { CloseButton } from 'entities';
import { useFocus, useIntersection } from '../model';
import styles from './MessageEditor.module.scss';

type Props = {
  vars: string[];
  setTemplate: SetTemplate;
  setVars: SetVars;
  template: ITemplateBlock;
  callbackSave: CallbackSave;
};

export const MessageEditor: FC<Props> = ({ vars, setVars, template, setTemplate, callbackSave }) => {
  const [isToolsHidden, setIsToolsHidden] = useState(false);
  const { setFocusEl, addCondition, addVariable, setHeadOnRender } = useFocus();
  const modalRef = useRef<ModalRef | null>(null);
  const ref = useRef<HTMLElement | null>(null);

  useIntersection({ ref, setIsToolsHidden });

  const swapModal = () => {
    modalRef.current?.swapModal();
  };

  const saveTemplate = () => callbackSave(template, vars);

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()} onFocus={setFocusEl}>
      <h2 className={styles.header}>Edit message</h2>

      <section ref={ref} className={styles.tools}>
        <VariablesPanel {...{ vars, setVars, addVariable }} />

        <ConditionPanel {...{ addCondition }} />
      </section>

      {isToolsHidden ? null : (
        <section className={`${styles.tools} ${styles.toolsFixed}`}>
          <VariablesPanel {...{ vars, setVars, addVariable }} />

          <ConditionPanel {...{ addCondition }} />

          <CloseButton {...{ closeHandler: () => setIsToolsHidden(true) }} />
        </section>
      )}

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
