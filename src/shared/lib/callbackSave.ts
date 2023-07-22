import { LOCAL_STORAGE_KEY } from 'shared';
import { ITemplate } from '../model/types/template';

export type CallbackSave = (template: ITemplate, vars: string[]) => Promise<void>;

export const callbackSave: CallbackSave = async (template, vars) => {
  localStorage.setItem(LOCAL_STORAGE_KEY.template, JSON.stringify(template));
  localStorage.setItem(LOCAL_STORAGE_KEY.vars, JSON.stringify(vars));
  return Promise.resolve();
};
