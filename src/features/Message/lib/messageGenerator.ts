import { ICondition, ITemplateBlock } from 'shared';

export type VarsObj = {
  [key: string]: string;
};
type Replacer = (text: string) => string;
type Generator = (varsObj: VarsObj, template: ITemplateBlock) => string;

export const messageGenerator: Generator = (varsObj, template) => {
  const { value: head, children, split } = template;
  const replacer = varReplacer(varsObj);
  const parsedHead = replacer(head);
  const parsedFoot = replacer(split || '');

  const middle = deepConstructor(replacer)(children);

  return parsedHead + middle + parsedFoot;
};

const deepConstructor = (replacer: Replacer) => {
  return (root: ICondition[]) => {
    const constructor = deepConstructor(replacer);

    return root.reduce((childrenText, child) => {
      const [ifBlock, thenBlock, elseBlock] = child.blocks;
      const parseIf = replacer(ifBlock.value);

      checkChildren(ifBlock);

      if (parseIf) {
        childrenText += replacer(thenBlock.value);
        checkChildren(thenBlock);
      } else {
        childrenText += replacer(elseBlock.value);
        checkChildren(elseBlock);
      }

      function checkChildren(block: ITemplateBlock) {
        const { children } = block;

        if (children.length) {
          childrenText += constructor(children);
        }
      }

      return childrenText;
    }, '');
  };
};

const varReplacer = (vars: VarsObj) => {
  return (text: string) => {
    let initial = text;

    for (const varName in vars) {
      initial = initial.replaceAll(`{ ${varName.toUpperCase()} }`, vars[varName]);
    }

    return initial;
  };
};
