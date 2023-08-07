import { FC, useEffect, useRef } from 'react';
import { TemplateInput } from '_entities';
import { ITemplateBlock, ElState, SetTemplate, useHandlers } from 'shared';
import { ConditionBlock } from 'features';
import styles from './InputArea.module.scss';

type Props = {
  template: ITemplateBlock;
  setTemplate: SetTemplate;
  setHeadOnRender: (state: ElState) => void;
};

export const InputArea: FC<Props> = ({ template, setTemplate, setHeadOnRender }) => {
  const { name, value, children } = template;
  const headRef = useRef<HTMLTextAreaElement | null>(null);
  const { changeText, addCondition } = useHandlers({ setTemplate, inputRef: headRef });

  // Sets root input state and handlers to the first render manipulations
  useEffect(() => {
    if (headRef.current) {
      setHeadOnRender({ name, el: headRef.current, addCondition, changeText });
    }
  }, [headRef, template]);

  return (
    <section className={styles.fields}>
      <>
        <h3 className={styles.header}>Message template</h3>

        <TemplateInput ref={headRef} {...{ name, value, addCondition, changeText, isRoot: true }} />

        {children.length ? (
          <div className="conditions">
            {children.map((condition) => (
              <ConditionBlock key={condition.id} {...{ condition, setTemplate, headRef }} />
            ))}
          </div>
        ) : null}
      </>
    </section>
  );
};
