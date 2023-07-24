import { FC, useDeferredValue, useMemo } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ITemplate, TVariable } from 'shared';
import { messageGenerator, VarsObj } from '../lib';

type Props = {
  variables: TVariable[];
  template: ITemplate;
};

export const Message: FC<Props> = ({ variables, template }) => {
  const parsedMessage = useMemo(() => {
    const varsObj = variables.reduce((vars, variable) => {
      const { name, value } = variable;

      vars[name] = value;

      return vars;
    }, {} as VarsObj);

    return messageGenerator(varsObj, template);
  }, [variables, template]);

  const defferedMessage = useDeferredValue(parsedMessage);

  return <TextareaAutosize readOnly value={defferedMessage} />;
};
