import { useEffect, useReducer, useState } from 'react';
import { ITemplate, templateReducer, TEMPLATE_KIND } from 'shared';
import { INITIAL_TEMPLATE } from '../constants';

export const usePreloadData = () => {
  const [template, dispatchTemplate] = useReducer(templateReducer, INITIAL_TEMPLATE);
  const [vars, setVars] = useState<string[]>([]);

  useEffect(() => {
    const arrVarNamesLS: string[] = localStorage.arrVarNames
      ? JSON.parse(localStorage.arrVarNames)
      : ['firstname', 'lastname', 'company', 'position'];

    const templateLS: ITemplate | null = localStorage.template ? JSON.parse(localStorage.template) : null;

    setVars(arrVarNamesLS);

    if (templateLS) {
      dispatchTemplate({ type: TEMPLATE_KIND.setTemplate, payload: templateLS });
    }
  }, []);

  return { template, dispatchTemplate, vars };
};
