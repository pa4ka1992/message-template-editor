import { FC, useEffect, useRef } from 'react';
import { TemplateInput } from '_entities';
import { ITemplateBlock, BLOCK_NAME, ElState, SetTemplate, useHandlers } from 'shared';
import { ConditionBlock } from 'features';
import styles from './InputArea.module.scss';

type Props = {
  template: ITemplateBlock;
  setTemplate: SetTemplate;
  setHeadOnRender: (state: ElState) => void;
};

export const InputArea: FC<Props> = ({ template, setTemplate, setHeadOnRender }) => {
  const { name, value, split, children } = template;
  const headRef = useRef<HTMLTextAreaElement | null>(null);
  const { changeText, changeSplitText, addCondition } = useHandlers({ template, setTemplate, inputRef: headRef });

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
          <>
            <div>
              {children.map((condition) => (
                <ConditionBlock key={condition.id} {...{ condition, setTemplate, headRef }} />
              ))}
            </div>

            <TemplateInput
              {...{ name: BLOCK_NAME.split, value: split, addCondition, changeText: changeSplitText, isRoot: true }}
            />
          </>
        ) : null}
      </>
    </section>
  );
};
