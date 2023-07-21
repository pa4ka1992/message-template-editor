import { FC, useRef } from 'react';
import { TemplateActions, TemplateFields, Variables } from 'features';
import { PreloadData, FocusContext, CallbackSave } from 'shared';
import { ConditionButton } from 'entities';
import { useInitialState } from '../model';

type Props = {
  preloadData: PreloadData | null;
  callbackSave: CallbackSave;
};

export const MessageEditor: FC<Props> = ({ preloadData, callbackSave: save }) => {
  const { template, vars } = useInitialState(preloadData);
  const elInFocus = useRef<HTMLTextAreaElement | null>(null);
  const addCondition = useRef<{ handler: () => void } | null>(null);

  const conditionHandler = () => {
    if (addCondition.current) {
      addCondition.current.handler();
    }
  };

  if (!preloadData) {
    return null;
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Variables {...{ vars }} />
      <ConditionButton {...{ conditionHandler }} />

      <FocusContext.Provider value={{ elInFocus, addCondition }}>
        <TemplateFields {...{ template }} />
      </FocusContext.Provider>

      <TemplateActions {...{ save: () => save(template, vars), preview: () => {}, close: () => {} }} />
    </form>
  );
};
