import { useEffect, useRef, useState } from 'react';
import { ITemplate } from 'shared';
import { INITIAL_TEMPLATE } from '../constants';

export const usePreloadData = () => {
  const templateRef = useRef<ITemplate>(INITIAL_TEMPLATE);
  const [vars, setVars] = useState<string[]>([]);

  useEffect(() => {
    const arrVarNames: string[] = localStorage.arrVarNames
      ? JSON.parse(localStorage.arrVarNames)
      : ['firstname', 'lastname', 'company', 'position'];

    const template: ITemplate | null = localStorage.template ? JSON.parse(localStorage.template) : null;

    setVars(arrVarNames);

    if (template) {
      templateRef.current = template;
    }
  }, []);

  return { templateRef, vars, setVars };
};
