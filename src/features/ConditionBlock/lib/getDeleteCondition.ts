import { MutableRefObject } from 'react';
import { ICondition, ITemplateBlock, SetTemplate } from 'shared';

type Props = {
  setTemplate: SetTemplate;
  headRef: MutableRefObject<HTMLTextAreaElement | null>;
  parentId: number;
};

export const getDeleteCondition = (props: Props) => {
  const { headRef, setTemplate, parentId } = props;

  const deleteCondition = async () => {
    await setTemplate((prev) => {
      if (prev.children.length === 1) {
        const [currCondition] = prev.children;

        return { ...prev, value: prev.value + currCondition.split, children: [] };
      }

      const { newChildren } = getNewChildren(prev, parentId);

      return { ...prev, children: newChildren };
    });

    if (headRef.current) {
      headRef.current.focus({ preventScroll: true });
      headRef.current.blur();
    }
  };

  return { deleteCondition };
};

function getNewChildren(prev: ITemplateBlock, parentId: number) {
  const newChildren = prev.children.reduce((accumChildren: ICondition[], child) => {
    if (child.id === parentId) {
      const prevCondition = accumChildren.at(-1);

      if (prevCondition && child.split) {
        const prevSplit = prevCondition.split;

        accumChildren.pop();
        accumChildren.push({
          ...prevCondition,
          split: prevSplit + child.split
        });

        return accumChildren;
      } else {
        prev.value += child.split;

        return accumChildren;
      }
    }

    accumChildren.push(child);

    return accumChildren;
  }, []);

  return { newChildren };
}
