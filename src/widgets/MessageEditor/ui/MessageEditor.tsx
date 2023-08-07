import { FC, Suspense, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ConditionPanel, ActionsPanel, VariablesPanel } from 'features';
import { CallbackSave, getLazyComponent, ITemplateBlock, ModalRef, SetTemplate, SetVars, Modal } from 'shared';
import { InputArea } from 'widgets';
import { useFocus, useIntersection } from '../model';
import styles from './MessageEditor.module.scss';

const ToolsHelper = getLazyComponent('widgets/MessageEditor/ui', 'ToolsHelper');
const Preview = getLazyComponent('widgets/Preview', 'Preview');

type Props = {
  vars: string[];
  setTemplate: SetTemplate;
  setVars: SetVars;
  template: ITemplateBlock;
  callbackSave: CallbackSave;
};

export const MessageEditor: FC<Props> = ({ vars, setVars, template, setTemplate, callbackSave }) => {
  const [isToolsHidden, setIsToolsHidden] = useState(true);
  const [collapseTools, setCollapseTools] = useState(false);

  //Sets handlers when any input focus is bubbling
  const { setFocusEl, addCondition, addVariable, setHeadOnRender } = useFocus();

  const modalRef = useRef<ModalRef | null>(null);
  const toolsRef = useRef<HTMLElement | null>(null);

  useIntersection({ ref: toolsRef, setIsToolsHidden });

  const swapModal = () => {
    modalRef.current?.swapModal();
  };

  const saveTemplate = () => callbackSave(template, vars);

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()} onFocus={setFocusEl}>
      <h2 className={styles.header}>Edit message</h2>

      <section ref={toolsRef} className={styles.tools}>
        <VariablesPanel {...{ vars, setVars, addVariable }} />

        <ConditionPanel {...{ addCondition }} />
      </section>

      {/* Helper tools has position fixed, whitch visability depends on intersection of main static tools  */}
      <Suspense fallback="Loading...">
        {isToolsHidden ? null : (
          <ToolsHelper
            {...{
              vars,
              setVars,
              addCondition,
              addVariable,
              collapseTools,
              setCollapseTools: () => setCollapseTools(!collapseTools)
            }}
          />
        )}
      </Suspense>

      <InputArea {...{ template, setTemplate, setHeadOnRender }} />

      <ActionsPanel {...{ saveTemplate, swapModal }} />

      {createPortal(
        <Modal ref={modalRef}>
          <Suspense fallback={'Loading...'}>
            <Preview {...{ vars, template, swapModal }} />
          </Suspense>
        </Modal>,
        document.body
      )}
    </form>
  );
};
