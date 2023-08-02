import { BLOCK_NAME, ConditionObj, ITemplateBlock } from 'shared';
import { messageGenerator, VarsObj } from './messageGenerator';

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

describe('message generator', () => {
  let template: ITemplateBlock;
  let vars: VarsObj;

  beforeEach(() => {
    vars = VARS;
    template = TEMPLATE;
  });

  test('parses message without conditions', () => {
    template.value = "Hello, I'm { FIRSTNAME } { LASTNAME }! I'm working at { COMPANY }.";
    template.children = [];

    expect(messageGenerator(vars, template)).toEqual("Hello, I'm John Doe! I'm working at Burger King.");
  });

  describe('parses message with conditions', () => {
    test('with the one level deep', () => {
      template.value = 'Hello, ';

      const condition1 = new ConditionObj('Nice to meet you. ');
      const [ifBlock1, thenBlock1, elseBlock1] = condition1.blocks;
      ifBlock1.value = '{ FIRSTNAME }';
      thenBlock1.value = "I'm { FIRSTNAME }! ";
      elseBlock1.value = 'you can call me Slave. ';

      const condition2 = new ConditionObj("So that's it. ");
      const [ifBlock2, thenBlock2, elseBlock2] = condition2.blocks;
      ifBlock2.value = '{ LASTNAME }';
      thenBlock2.value = 'My second name is { LASTNAME }. ';
      elseBlock2.value = 'Nobody cares about my second name, right? ';

      const condition3 = new ConditionObj('It has been going on for almost two years.');
      const [ifBlock3, thenBlock3, elseBlock3] = condition3.blocks;
      ifBlock3.value = '{ COMPANY }';
      thenBlock3.value = "I'm working at { COMPANY }. ";
      elseBlock3.value = 'I am unemployed. ';

      template.children = [condition1, condition2, condition3];

      expect(messageGenerator(vars, template)).toEqual(
        "Hello, I'm John! Nice to meet you. My second name is Doe. So that's it. I'm working at Burger King. It has been going on for almost two years."
      );

      vars.firstname = '';
      vars.lastname = '';
      vars.company = '';

      expect(messageGenerator(vars, template)).toEqual(
        "Hello, you can call me Slave. Nice to meet you. Nobody cares about my second name, right? So that's it. I am unemployed. It has been going on for almost two years."
      );
    });

    // test('with the multiple level deep', () => {
    //   VARS.firstname = 'John';
    //   VARS.lastname = 'Doe';
    //   VARS.company = 'Burger King';

    //   TEMPLATE.value = "Hello, I'm { FIRSTNAME } { LASTNAME }! I'm working at { COMPANY }.";
    //   // TEMPLATE.split = ' Bye';
    //   // TEMPLATE.children[0].blocks[0].value = '{ COMPANY }';
    //   // TEMPLATE.children[0].blocks[1].value = 'You are working at { COMPANY }.';
    //   // TEMPLATE.children[0].blocks[2].value = 'Where are you working?';

    //   const message = messageGenerator(VARS, TEMPLATE);

    //   expect(message).toEqual("Hello, I'm John Doe! I'm working at Burger King.");
    // });
  });
});
