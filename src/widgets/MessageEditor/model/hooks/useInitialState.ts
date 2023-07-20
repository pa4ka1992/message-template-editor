import { useEffect, useRef, useState } from 'react';
import { ITemplate, PreloadData } from 'shared';

export const useInitialState = (preloadData: PreloadData | null) => {
  const template = useRef<ITemplate>({ value: '', children: [] });
  const [vars, setVars] = useState<string[]>([]);

  useEffect(() => {
    if (preloadData) {
      const { arrVarNames, template: tempaltePreload } = preloadData;

      setVars(arrVarNames);

      if (tempaltePreload) {
        template.current = tempaltePreload;
      }
    }
  }, [preloadData]);

  return { template, vars };
};
