import { ITemplate } from 'shared';
import { varReplacer } from './varReplacer';
import { deepConstructor } from './deepConstructor';

export type VarsObj = {
  [key: string]: string;
};

type Generator = (varsObj: VarsObj, template: ITemplate) => string;

export const messageGenerator: Generator = (varsObj, template) => {
  const { head, foot } = template;
  const replacer = varReplacer(varsObj);
  const parsedHead = replacer(head.value);
  const parsedFoot = replacer(foot.value);

  const middle = deepConstructor(replacer)(head.children);

  return parsedHead + middle + parsedFoot;
};
