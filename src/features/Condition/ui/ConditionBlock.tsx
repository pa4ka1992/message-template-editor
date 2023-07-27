import { FC, useEffect, useState } from 'react';
import { Dispatcher, ICondition, TemplateBlock, ConditionObj } from 'shared';
import { TemplateInput } from 'entities';
import { getBlockColor } from '../lib';
import { Condition } from './Condition';
import styles from './ConditionBlock.module.scss';

type Props = {
  field: TemplateBlock;
  setCondition: Dispatcher<ICondition>;
};

export const ConditionBlock: FC<Props> = ({ field, setCondition }) => {
  const [value, setValue] = useState(field.value);
  const [children, setChildren] = useState(field.children);
  const { name } = field;

  useEffect(() => {
    setCondition((prev) => {
      const { id, fields } = prev;

      const newFields = fields.map((field) => {
        if (field.name === name) {
          return {
            name,
            value,
            children
          };
        }

        return field;
      });

      return { id, fields: newFields };
    });
  }, [value, children]);

  const changeText = (val: string) => {
    setValue(val);
  };

  const addCondition = () => {
    setChildren([...children, new ConditionObj()]);
  };

  const Children = () => {
    return (
      <div className={styles.children}>
        {children.map((block, i) => (
          <Condition key={block.id + i} {...{ block, setChildren }} />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <p className={styles.blockName} style={{ color: getBlockColor(name) }}>
          {name}
        </p>

        <TemplateInput {...{ name, value, changeText, addCondition }} />
      </div>

      {children.length ? <Children /> : null}
    </div>
  );
};
