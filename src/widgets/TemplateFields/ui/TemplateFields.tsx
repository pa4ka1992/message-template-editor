import { FC, useContext, useEffect } from 'react';
import { TemplateInput } from 'entities';
import { FocusContext, ITemplate, useCondition } from 'shared';
import { Condition } from 'features';
import styles from './TemplateFields.module.scss';

type Props = {
  template: ITemplate;
};

export const TemplateFields: FC<Props> = ({ template }) => {
  const { head, foot } = template;
  const { conditions, addCondition, deleteCondition } = useCondition(head, template);
  const { rootElements } = useContext(FocusContext);

  useEffect(() => {
    if (!conditions.length) {
      const { headEl, footEl } = rootElements;

      headEl?.changeText(head.value + foot.value);
      footEl?.changeText('');
    }
  }, [conditions]);

  const children = () => {
    return (
      <>
        <div className={styles.conditions}>
          {conditions.map((condition, i) => (
            <Condition key={condition.id + i} {...{ condition, deleteCondition }} />
          ))}
        </div>

        <TemplateInput {...{ block: foot, addCondition }} />
      </>
    );
  };

  return (
    <div className={styles.fields}>
      <>
        <h3 className={styles.header}>Message template</h3>

        <TemplateInput {...{ block: head, addCondition }} />

        {conditions.length ? children() : null}
      </>
    </div>
  );
};
