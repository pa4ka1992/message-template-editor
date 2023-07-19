import { FC, useState } from 'react';
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
  const [elInFocus, setElInFocus] = useState<HTMLTextAreaElement | null>(null);

  const conditionHandler = () => {
    return elInFocus;
  };

  if (!preloadData) {
    return null;
  }

  return (
    <form>
      <Variables {...{ vars }} />
      <ConditionButton {...{ conditionHandler }} />

      <FocusContext.Provider value={{ setElInFocus: (el: HTMLTextAreaElement) => setElInFocus(el) }}>
        <TemplateFields {...{ template }} />
      </FocusContext.Provider>

      <TemplateActions {...{ save: () => save(template, vars), preview: () => {}, close: () => {} }} />
    </form>
  );
};
