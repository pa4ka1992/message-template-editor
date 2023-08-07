import { FC, memo, MouseEvent } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Button, BUTTON_CLASS, SetVars } from 'shared';
import styles from './VariableButton.module.scss';

type Props = {
  varName: string;
  setVars: SetVars;
  addVariable: (varName: string) => void;
};

const VariableButton: FC<Props> = ({ varName, setVars, addVariable }) => {
  const deleteHandler = (e: MouseEvent<HTMLElement>, varToRemove: string) => {
    e.stopPropagation();

    setVars((prev) => {
      return prev.filter((currVar) => currVar !== varToRemove);
    });
  };

  return (
    <Button buttonClass={BUTTON_CLASS.var} handler={() => addVariable(varName)}>
      {`{ ${varName} }`}

      <div onClick={(e) => deleteHandler(e, varName)} className={styles.delete}>
        <IoMdClose className={styles.deleteIcon} />
      </div>
    </Button>
  );
};

export default memo(VariableButton);
