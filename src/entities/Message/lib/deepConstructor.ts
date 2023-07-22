import { ICondition, TemplateBlock } from 'shared';

export const deepConstructor = (replacer: (text: string) => string) => {
  return (root: ICondition<TemplateBlock>[]) => {
    const constructor = deepConstructor(replacer);

    return root.reduce((childrenText, child) => {
      const { ifBlock, elseBlock, thenBlock } = child;

      const parseIf = replacer(ifBlock.value);

      checkChildren(ifBlock);

      if (parseIf) {
        childrenText += replacer(thenBlock.value);

        checkChildren(thenBlock);
      } else {
        childrenText += replacer(elseBlock.value);

        checkChildren(elseBlock);
      }

      function checkChildren(block: TemplateBlock) {
        const { children } = block;

        if (children.length) {
          childrenText += constructor(children);
        }
      }

      return childrenText;
    }, '');
  };
};
