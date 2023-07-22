import { FC, useState } from 'react';
import { MessageEditor, Preview } from 'widgets';
import { Modal, callbackSave } from 'shared';
import { usePreloadData } from './model';

export const Template: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { vars, setVars, template } = usePreloadData();

  const closeHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const previewContent = <Preview {...{ vars, template, closeHandler }} />;

  return (
    <>
      <MessageEditor {...{ vars, setVars, template, callbackSave }} />

      {isModalOpen ? Modal(previewContent, closeHandler) : null}
    </>
  );
};
