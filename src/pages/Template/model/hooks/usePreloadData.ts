import { useEffect, useState } from 'react';
import { ITemplate } from 'shared';
import { INITIAL_TEMPLATE, INITIAL_VARS } from '../constants';

export const usePreloadData = () => {
  const [template, setTemplate] = useState<ITemplate>(INITIAL_TEMPLATE);
  const [vars, setVars] = useState<string[]>([]);

  useEffect(() => {
    const arrVarNamesLS: string[] = localStorage.arrVarNames ? JSON.parse(localStorage.arrVarNames) : INITIAL_VARS;

    const templateLS: ITemplate | null = localStorage.template ? JSON.parse(localStorage.template) : null;

    setVars(arrVarNamesLS);

    if (templateLS) {
      setTemplate(templateLS);
    }
  }, []);

  return { template, setTemplate, vars };
};
