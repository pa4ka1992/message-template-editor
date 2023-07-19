import { FC } from 'react';
import { MessageEditor } from 'widgets';
import { callbackSave } from 'shared';
import { usePreloadData } from './model';

export const Template: FC = () => {
  const { preloadData } = usePreloadData();

  return <MessageEditor {...{ preloadData, callbackSave }} />;
};
