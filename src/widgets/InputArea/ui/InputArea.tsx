import { FC, useEffect, useRef } from 'react';
import { TemplateInput } from 'entities';
import { ITemplate, BLOCK_NAME, ConditionObj, ElState, splitNodeText, Dispatcher } from 'shared';
// import { Condition } from 'features';
import styles from './InputArea.module.scss';

type Props = {
  template: ITemplate;
  setTemplate: Dispatcher<ITemplate>;
  setElsOnRender: (name: string, state: ElState) => void;
};

export const InputArea: FC<Props> = ({ template, setTemplate, setElsOnRender }) => {
  const { name, value, split, children } = template;

  const headRefEl = useRef<HTMLTextAreaElement | null>(null);
  const splitRefEl = useRef<HTMLTextAreaElement | null>(null);

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

    if (!children.length && headRefEl.current) {
      const { startText, endText } = splitNodeText(headRefEl.current);

      setTemplate((prev) => ({ ...prev, value: startText, split: endText, children: newChildren }));
      return;
    }

    setTemplate((prev) => ({ ...prev, children: newChildren }));
  };

  useEffect(() => {
    if (headRefEl.current) {
      setElsOnRender(BLOCK_NAME.head, { el: headRefEl.current, addCondition, changeText });
    }

    if (splitRefEl.current) {
      setElsOnRender(BLOCK_NAME.split, { el: splitRefEl.current, addCondition, changeText });
    }
  }, [headRefEl, splitRefEl]);

  const Children = () => {
    return (
      <>
        <div className={styles.conditions}>
          {/* {children.map((condition, i) => (
            <Condition key={condition.id + i} {...{ condition, setParent: setTemplate }} />
          ))} */}
        </div>

        <TemplateInput
          ref={splitRefEl}
          {...{ name: BLOCK_NAME.split, value: split, addCondition, changeText: changeSplitText }}
        />
      </>
    );
  };

  return (
    <div className={styles.fields}>
      <>
        <h3 className={styles.header}>Message template</h3>

        <TemplateInput ref={headRefEl} {...{ name, value, addCondition, changeText }} />

        {children.length ? <Children /> : null}
      </>
    </div>
  );
};
