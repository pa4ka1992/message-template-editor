import { BLOCK_NAME, ConditionObj, ITemplateBlock } from 'shared';

const VARS = {
  firstname: 'John',
  lastname: 'Doe',
  company: 'Burger King',
  position: 'cook'
};

const TEMPLATE: ITemplateBlock = {
  name: BLOCK_NAME.head,
  value: '',
  children: []
};

const getCondition1 = () => {
  const condition1 = new ConditionObj(' Nice to meet you.');
  const [ifBlock1, thenBlock1, elseBlock1] = condition1.blocks;
  ifBlock1.value = '{FIRSTNAME}';
  thenBlock1.value = "I'm {FIRSTNAME}!";
  elseBlock1.value = 'you can call me Slave.';

  return condition1;
};

const getCondition2 = () => {
  const condition2 = new ConditionObj(" So that's it.");
  const [ifBlock2, thenBlock2, elseBlock2] = condition2.blocks;
  ifBlock2.value = '{LASTNAME}';
  thenBlock2.value = ' My second name is {LASTNAME}.';
  elseBlock2.value = ' Nobody cares about my second name, right?';

  return condition2;
};

const getCondition3 = () => {
  const condition3 = new ConditionObj(' It has been going on for almost two years.');
  const [ifBlock3, thenBlock3, elseBlock3] = condition3.blocks;
  ifBlock3.value = '{COMPANY}';
  thenBlock3.value = " I'm working at {COMPANY}.";
  elseBlock3.value = ' I am unemployed.';

  return condition3;
};

const MOCKS = { VARS, TEMPLATE, getCondition1, getCondition2, getCondition3 };

export default MOCKS;
