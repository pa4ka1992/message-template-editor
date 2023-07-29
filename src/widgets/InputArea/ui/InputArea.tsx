import { FC, useEffect, useRef } from 'react';
import { TemplateInput } from 'entities';
import { ITemplate, BLOCK_NAME, ConditionObj, ElState, splitNodeText, Dispatcher } from 'shared';
import { Condition } from 'features';
import styles from './InputArea.module.scss';

type Props = {
  template: ITemplate;
  setTemplate: Dispatcher<ITemplate>;
  setElsOnRender: (name: string, state: ElState) => void;
};

export const InputArea: FC<Props> = ({ template, setTemplate, setElsOnRender }) => {
  const { name, value, split, children } = template;

  const headRef = useRef<HTMLTextAreaElement | null>(null);
  const splitRef = useRef<HTMLTextAreaElement | null>(null);

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
      setElsOnRender(BLOCK_NAME.head, { el: headRef.current, addCondition, changeText });
    }

    if (splitRef.current) {
      setElsOnRender(BLOCK_NAME.split, { el: splitRef.current, addCondition, changeText });
    }
  }, [headRef, splitRef]);

  return (
    <div className={styles.fields}>
      <>
        <h3 className={styles.header}>Message template</h3>

        <TemplateInput ref={headRef} {...{ name, value, addCondition, changeText }} />

        {children.length ? (
          <>
            <div className={styles.conditions}>
              {children.map((condition, i) => (
                <Condition key={condition.id + i} {...{ condition, setTemplate, parentRef: headRef }} />
              ))}
            </div>

            <TemplateInput
              ref={splitRef}
              {...{ name: BLOCK_NAME.split, value: split, addCondition, changeText: changeSplitText }}
            />
          </>
        ) : null}
      </>
    </div>
  );
};
