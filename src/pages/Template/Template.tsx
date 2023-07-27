import { FC } from 'react';
import { MessageEditor } from 'widgets';
import { callbackSave } from 'shared';
import { usePreloadData } from './model';

export const Template: FC = () => {
  const { vars, template, setTemplate } = usePreloadData();

  return <MessageEditor {...{ vars, setTemplate, template, callbackSave }} />;
};
