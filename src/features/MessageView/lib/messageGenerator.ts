import { ICondition, ITemplateBlock, VarsObj } from 'shared';
import { replaceBrackets, restoreString } from './replaceBrackets';

type Replacer = (text: string) => string;
type Generator = (varsObj: VarsObj, template: ITemplateBlock) => string;
type DeepConstructor = (children: ICondition[], varsObj: VarsObj, replacer: Replacer) => string;

const varReplacer = (vars: VarsObj) => {
  return (text: string) => {
    let initial = text;

    for (const varName in vars) {
      initial = initial.replaceAll(`{${varName.toUpperCase()}}`, replaceBrackets(vars[varName]));
    }

    return restoreString(initial);
  };
};

const deepConstructor: DeepConstructor = (children, varsObj, replacer) => {
  return children.reduce((parsedText, child) => {
    const [ifBlock, thenBlock, elseBlock] = child.blocks;

    const parsedIf = messageGenerator(varsObj, ifBlock);

    if (parsedIf) {
      parsedText += messageGenerator(varsObj, thenBlock);
    } else {
      parsedText += messageGenerator(varsObj, elseBlock);
    }

    parsedText += replacer(child.split);

    return parsedText;
  }, '');
};

export const messageGenerator: Generator = (varsObj, template) => {
  const { value, children } = template;
  const replacer = varReplacer(varsObj);
  const parsedValue = replacer(value);

  if (children.length) {
    const parsedIfs = deepConstructor(children, varsObj, replacer);

    return parsedValue + parsedIfs;
  }

  return parsedValue;
};
