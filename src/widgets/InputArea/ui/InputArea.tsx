import { Dispatch, FC, useEffect, useRef, useState } from 'react';
import { TemplateInput } from 'entities';
import { ITemplate, TemplateActions, TEMPLATE_KIND, BLOCK_NAME, ConditionObj, ElState, splitNodeText } from 'shared';
import { Condition } from 'features';
import styles from './InputArea.module.scss';

type Props = {
  template: ITemplate;
  dispatchTemplate: Dispatch<TemplateActions>;
  setElsOnRender: (name: string, state: ElState) => void;
};

export const InputArea: FC<Props> = ({ template, dispatchTemplate, setElsOnRender }) => {
  const { name, value, split } = template;

  const [children, setChildren] = useState(template.children);
  const headRefEl = useRef<HTMLTextAreaElement | null>(null);
  const splitRefEl = useRef<HTMLTextAreaElement | null>(null);

  const changeText = (val: string) => {
    dispatchTemplate({ type: TEMPLATE_KIND.setVal, payload: val });
  };

  const changeSplitText = (val: string) => {
    dispatchTemplate({ type: TEMPLATE_KIND.setSplit, payload: val });
  };

  const addCondition = () => {
    if (!children.length && headRefEl.current) {
      const { startText, endText } = splitNodeText(headRefEl.current);

      changeText(startText);
      changeSplitText(endText);
    }

    setChildren([...children, new ConditionObj()]);
  };

  useEffect(() => {
    if (headRefEl.current) {
      setElsOnRender(BLOCK_NAME.head, { el: headRefEl.current, addCondition, changeText });
    }

    if (splitRefEl.current) {
      setElsOnRender(BLOCK_NAME.split, { el: splitRefEl.current, addCondition, changeText });
    }
  }, [headRefEl, splitRefEl]);

  useEffect(() => {
    if (!children.length) {
      changeText(value + split);
      changeSplitText('');

      const newTemplate = {
        name,
        value: value + split,
        split: '',
        children
      };

      dispatchTemplate({ type: TEMPLATE_KIND.setTemplate, payload: newTemplate });
      return;
    }

    dispatchTemplate({ type: TEMPLATE_KIND.setChildren, payload: children });
  }, [children]);

  const Children = () => {
    return (
      <>
        <div className={styles.conditions}>
          {children.map((block, i) => (
            <Condition key={block.id + i} {...{ block, setChildren }} />
          ))}
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
