import { useEffect, useState } from 'react';
import { ITemplate, PreloadData } from 'shared';

export const usePreloadData = () => {
  const [preloadData, setPreloadData] = useState<PreloadData | null>(null);

  useEffect(() => {
    const arrVarNames: string[] = localStorage.arrVarNames
      ? JSON.parse(localStorage.arrVarNames)
      : ['firstname', 'lastname', 'company', 'position'];

    const template: ITemplate | null = localStorage.template ? JSON.parse(localStorage.template) : null;

    setPreloadData({ arrVarNames, template });
  }, []);

  return { preloadData };
};
