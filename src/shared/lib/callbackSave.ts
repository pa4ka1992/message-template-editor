import { LOCAL_STORAGE_KEYS } from 'shared';
import { ITemplate } from '../model/types/template';

export const callbackSave = async (template: ITemplate, vars: string[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.template, JSON.stringify(template));
  localStorage.setItem(LOCAL_STORAGE_KEYS.vars, JSON.stringify(vars));
  return Promise.resolve();
};
