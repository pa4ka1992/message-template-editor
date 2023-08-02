import { ITemplateBlock, SetTemplate } from 'shared';

type Props = {
  parentId: number;
  setTemplate: SetTemplate;
};

export const getSetblock = (props: Props) => {
  const { setTemplate, parentId } = props;

  const setBlock = (newBlock: ITemplateBlock) => {
    setTemplate((prev) => {
      const newChildren = prev.children.map((child) => {
        if (child.id === parentId) {
          const updatedBlocks = child.blocks.map((block) => {
            if (block.name === newBlock.name) {
              return newBlock;
            }

            return block;
          });

          return { ...child, blocks: updatedBlocks };
        }

        return child;
      });

      return { ...prev, children: newChildren };
    });
  };

  return { setBlock };
};
