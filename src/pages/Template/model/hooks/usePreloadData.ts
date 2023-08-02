import { useCallback, useEffect, useState } from 'react';
import { ITemplateBlock } from 'shared';
import { isTemplate, isVarsArray } from '../../lib';
import { INITIAL_TEMPLATE, INITIAL_VARS } from '../constants';

export const usePreloadData = () => {
  const [template, setTemplate] = useState<ITemplateBlock>(INITIAL_TEMPLATE);
  const [vars, setVars] = useState<string[]>([]);

  useEffect(() => {
    const arrVarNamesLS: unknown = localStorage.arrVarNames ? JSON.parse(localStorage.arrVarNames) : INITIAL_VARS;

    const templateLS: unknown = localStorage.template ? JSON.parse(localStorage.template) : null;

    if (isVarsArray(arrVarNamesLS)) {
      setVars(arrVarNamesLS);
    }

    if (isTemplate(templateLS)) {
      setTemplate(templateLS);
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
