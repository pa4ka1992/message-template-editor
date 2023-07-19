import { FC, useEffect, useState } from 'react';
import { MessageEditor } from 'widgets';
import { callbackSave, PreloadData } from 'shared';

export const Template: FC = () => {
  const [preloadData, setPreloadData] = useState<PreloadData | null>(null);

  useEffect(() => {
    const arrVarNames = localStorage.arrVarNames
      ? JSON.parse(localStorage.arrVarNames)
      : ['firstname', 'lastname', 'company', 'position'];

    const template = localStorage.template ? JSON.parse(localStorage.template) : null;

    setPreloadData({ arrVarNames, template });
  }, []);

  return <MessageEditor {...{ preloadData, callbackSave }} />;
};
