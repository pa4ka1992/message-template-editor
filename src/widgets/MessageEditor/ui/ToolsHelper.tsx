import { FC } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { SetVars } from 'shared';
import { ConditionPanel, VariablesPanel } from 'features';
import styles from './ToolsHelper.module.scss';
import stylesMessage from './MessageEditor.module.scss';

type Props = {
  vars: string[];
  setVars: SetVars;
  addVariable: (varName: string) => Promise<void>;
  addCondition: () => Promise<void>;
  collapseTools: boolean;
  setCollapseTools: () => void;
};

export const ToolsHelper: FC<Props> = ({
  vars,
  setVars,
  addCondition,
  addVariable,
  collapseTools,
  setCollapseTools
}) => {
  return (
    <section className={`${stylesMessage.tools} ${styles.toolsFixed}`}>
      <div className={styles.barCollapse} onClick={() => setCollapseTools()}>
        <h4>Tools</h4>

        <IoIosArrowUp className={`${collapseTools ? styles.arrowUp : styles.arrowDown}`} />
      </div>

      <div className={`${styles.fixedPanel} ${collapseTools ? styles.collapse : styles.expand}`}>
        <VariablesPanel {...{ vars, setVars, addVariable }} />
        <ConditionPanel {...{ addCondition }} />
      </div>
    </section>
  );
};
