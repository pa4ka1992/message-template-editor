import { ICondition, ITemplateBlock } from 'shared';

export type VarsObj = {
  [key: string]: string;
};

type Generator = (varsObj: VarsObj, template: ITemplateBlock) => string;

export const messageGenerator: Generator = (varsObj, template) => {
  const { value, children } = template;
  const replacer = varReplacer(varsObj);
  const parsedValue = replacer(value);

  if (children.length) {
    const parsedIfs = deepConstructor(children, varsObj);

    return parsedValue + parsedIfs;
  }

  return parsedValue;
};

function deepConstructor(children: ICondition[], varsObj: VarsObj) {
  return children.reduce((parsedText, child) => {
    const [ifBlock, thenBlock, elseBlock] = child.blocks;

    const parsedIf = messageGenerator(varsObj, ifBlock);

    if (parsedIf) {
      parsedText += messageGenerator(varsObj, thenBlock);
    } else {
      parsedText += messageGenerator(varsObj, elseBlock);
    }

    parsedText += child.split;

    return parsedText;
  }, '');
}

function varReplacer(vars: VarsObj) {
  return (text: string) => {
    let initial = text;

    for (const varName in vars) {
      initial = initial.replaceAll(`{ ${varName.toUpperCase()} }`, vars[varName]);
    }

    return initial;
  };
}
