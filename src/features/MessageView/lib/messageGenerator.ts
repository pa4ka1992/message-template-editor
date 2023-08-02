import { ICondition, ITemplateBlock } from 'shared';

export type VarsObj = {
  [key: string]: string;
};
type Replacer = (text: string) => string;
type Generator = (varsObj: VarsObj, template: ITemplateBlock) => string;

export const messageGenerator: Generator = (varsObj, template) => {
  const { value, children } = template;
  const replacer = varReplacer(varsObj);
  const parsedValue = replacer(value);

  if (children.length) {
    // const parsedSplit = replacer(split);
    const middle = deepConstructor(replacer)(children, varsObj);

    // return parsedValue + middle + parsedSplit;
    return parsedValue + middle;
  }

  return parsedValue;
};

function deepConstructor(replacer: Replacer) {
  return (children: ICondition[], varsObj: VarsObj) => {
    return children.reduce((childrenText, child) => {
      const [ifBlock, thenBlock, elseBlock] = child.blocks;

      const parsedIf = messageGenerator(varsObj, ifBlock);

      if (parsedIf) {
        childrenText += messageGenerator(varsObj, thenBlock);
      } else {
        childrenText += messageGenerator(varsObj, elseBlock);
      }

      return childrenText;
    }, '');
  };
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
