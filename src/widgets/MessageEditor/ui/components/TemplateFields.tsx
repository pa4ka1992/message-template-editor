import { FC, useContext, useEffect } from 'react';
import { TemplateInput } from 'entities';
import { FocusContext, ITemplate, useCondition } from 'shared';
import { Condition } from 'features';

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

  return (
    <div>
      <TemplateInput {...{ block: head, addCondition }} />

      {conditions.map((condition) => (
        <Condition key={condition.id} {...{ condition, deleteCondition }} />
      ))}

      {conditions.length ? <TemplateInput {...{ block: foot, addCondition }} /> : null}
    </div>
  );
};
