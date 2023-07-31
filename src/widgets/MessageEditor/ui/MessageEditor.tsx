import { FC, useEffect, useRef, useState } from 'react';
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
  const ref = useRef<HTMLElement | null>(null);
  const [isToolsVisible, setIsToolsVisible] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const callback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          setIsToolsVisible(entry.isIntersecting);
        });
      };

      const observer = new IntersectionObserver(callback);

      observer.observe(ref.current);
    }
  }, [ref]);

  const swapModal = () => {
    modalRef.current?.swapModal();
  };

  const saveTemplate = () => callbackSave(template, vars);

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()} onFocus={setFocusEl}>
      <h2 className={styles.header}>Edit message</h2>

      <section ref={ref} className={styles.tools}>
        <VariablesPanel {...{ vars, addVariable }} />

        <ConditionPanel {...{ addCondition }} />
      </section>

      {isToolsVisible ? null : (
        <section className={`${styles.tools} ${styles.toolsFixed}`}>
          <VariablesPanel {...{ vars, addVariable }} />

          <ConditionPanel {...{ addCondition }} />
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
