import { useCallback, useEffect, useState } from 'react';
import { ITemplateBlock, LOCAL_STORAGE_KEY } from 'shared';
import { isTemplate, isVarsArray } from '../../lib';
import { INITIAL_TEMPLATE, INITIAL_VARS } from '../constants';

export const usePreloadData = () => {
  const [template, setTemplate] = useState<ITemplateBlock>(INITIAL_TEMPLATE);
  const [vars, setVars] = useState<string[]>([]);

  useEffect(() => {
    const arrVarNamesLS = localStorage[LOCAL_STORAGE_KEY.vars];
    const templateLS = localStorage[LOCAL_STORAGE_KEY.template];

    const newArrVarNames: unknown = arrVarNamesLS ? JSON.parse(arrVarNamesLS) : INITIAL_VARS;
    const newTemplate: unknown = templateLS ? JSON.parse(templateLS) : null;

    if (isVarsArray(newArrVarNames)) {
      setVars(newArrVarNames);
    }

    if (isTemplate(newTemplate)) {
      setTemplate(newTemplate);
    }
  }, []);

  const updateTemplate = useCallback(
    (callback: (prev: ITemplateBlock) => ITemplateBlock) => {
      setTemplate((prev) => callback(prev));
    },
    [setTemplate]
  );

  const updateVars = useCallback(
    (callback: (prev: string[]) => string[]) => {
      setVars((prev) => callback(prev));
    },
    [setTemplate]
  );

  return { template, setTemplate: updateTemplate, vars, setVars: updateVars };
};
