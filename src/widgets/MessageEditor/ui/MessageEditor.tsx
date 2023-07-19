import { FC, useEffect, useState } from 'react';
import { TemplateActions, TemplateFields, Variables } from 'features';
import { Button, ITemplate, PreloadData } from 'shared';

type Props = {
  preloadData: PreloadData | null;
  callbackSave: (template: ITemplate, vars: string[]) => Promise<void>;
};

export const MessageEditor: FC<Props> = ({ preloadData, callbackSave }) => {
  const [template, setTemplate] = useState<ITemplate | null>(null);
  const [vars, setVars] = useState<string[] | null>(null);
  // const [elInFocus, setElInFocus] = useState({});

  useEffect(() => {
    if (preloadData) {
      const { arrVarNames, template } = preloadData;
      setVars(arrVarNames);
      setTemplate(template);
    }
  }, [preloadData]);

  if (!preloadData) {
    return null;
  }

  return (
    <>
      <Variables {...{ vars }} />
      <Button value="IF | THEN | ELSE " handler={() => {}} />
      <TemplateFields {...{ template }} />
      <TemplateActions />
    </>
  );
};
