import { MutableRefObject } from 'react';
import { LOCAL_STORAGE_KEY } from 'shared';
import { ITemplate } from '../model/types/template';

export const callbackSave = async (templateRef: MutableRefObject<ITemplate>, vars: string[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY.template, JSON.stringify(templateRef.current));
  localStorage.setItem(LOCAL_STORAGE_KEY.vars, JSON.stringify(vars));
  return Promise.resolve();
};
