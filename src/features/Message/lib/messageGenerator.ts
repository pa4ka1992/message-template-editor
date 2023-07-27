import { ITemplate } from 'shared';
import { varReplacer } from './varReplacer';
import { deepConstructor } from './deepConstructor';

export type VarsObj = {
  [key: string]: string;
};

type Generator = (varsObj: VarsObj, template: ITemplate) => string;

export const messageGenerator: Generator = (varsObj, template) => {
  const { value: head, children, split } = template;
  const replacer = varReplacer(varsObj);
  const parsedHead = replacer(head);
  const parsedFoot = replacer(split);

  const middle = deepConstructor(replacer)(children);

  return parsedHead + middle + parsedFoot;
};
