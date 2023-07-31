import { FC, useEffect, useRef } from 'react';
import { TemplateInput } from 'entities';
import { ITemplateBlock, BLOCK_NAME, ConditionObj, ElState, splitNodeText, SetTemplate } from 'shared';
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

  useEffect(() => {
    if (!children.length) {
      const newTemplate = {
        value: value + split,
        split: '',
        children
      };

      setTemplate((prev) => ({ ...prev, ...newTemplate }));
    }
  }, [children]);

  const changeText = (val: string) => {
    setTemplate((prev) => ({ ...prev, value: val }));
  };

  const changeSplitText = (val: string) => {
    setTemplate((prev) => ({ ...prev, split: val }));
  };

  const addCondition = () => {
    const newChildren = [...children, new ConditionObj()];

    if (!children.length && headRef.current) {
      const { startText, endText } = splitNodeText(headRef.current);

      setTemplate((prev) => ({ ...prev, value: startText, split: endText, children: newChildren }));
      return;
    }

    setTemplate((prev) => ({ ...prev, children: newChildren }));
  };

  useEffect(() => {
    if (headRef.current) {
      setHeadOnRender({ name, el: headRef.current, addCondition, changeText });
    }
  }, [headRef, template]);

  return (
    <section className={styles.fields}>
      <>
        <h3 className={styles.header}>Message template</h3>

        <TemplateInput ref={headRef} {...{ name, value, addCondition, changeText }} />

        {children.length ? (
          <>
            <div>
              {children.map((condition, i) => (
                <ConditionBlock key={condition.id} {...{ condition, setTemplate, parentRef: headRef }} />
              ))}
            </div>

            <TemplateInput
              {...{ name: BLOCK_NAME.split, value: split || '', addCondition, changeText: changeSplitText }}
            />
          </>
        ) : null}
      </>
    </section>
  );
};
