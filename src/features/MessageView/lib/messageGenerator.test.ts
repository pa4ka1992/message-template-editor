import { ITemplateBlock, VarsObj } from 'shared';
import { messageGenerator } from './messageGenerator';
import MOCKS from './mocks';

const { VARS, TEMPLATE, getCondition1, getCondition2, getCondition3 } = MOCKS;

describe('message generator', () => {
  let template: ITemplateBlock;
  let vars: VarsObj;

  beforeEach(() => {
    vars = { ...VARS };
    template = { ...TEMPLATE };
  });

  test('parses message without conditions', () => {
    template.value = "Hello, I'm {FIRSTNAME} {LASTNAME}! I'm working at {COMPANY}.";
    template.children = [];

    expect(messageGenerator(vars, template)).toEqual("Hello, I'm John Doe! I'm working at Burger King.");
  });

  test('parses message with one level deep conditions', () => {
    template.value = 'Hello, ';

    template.children = [getCondition1(), getCondition2(), getCondition3()];

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

  test("generator doesn't parse values as variables", () => {
    template.value = "Hello, I'm {FIRSTNAME} {LASTNAME}! I'm working at {COMPANY}.";
    template.children = [];

    vars.firstname = '{LASTNAME}';
    vars.company = '{FIRSTNAME}';

    expect(messageGenerator(vars, template)).toEqual("Hello, I'm {LASTNAME} Doe! I'm working at {FIRSTNAME}.");
  });

  test('parses message with multiple level deep conditions', () => {
    template.value = 'Hello, ';

    const condition1 = getCondition1();
    const condition2 = getCondition2();

    condition2.blocks[1].children = [getCondition3()];
    condition1.blocks[1].children = [condition2];
    template.children = [condition1];

    expect(messageGenerator(vars, template)).toEqual(
      "Hello, I'm John! My second name is Doe. I'm working at Burger King. It has been going on for almost two years. So that's it. Nice to meet you."
    );
  });

  test('parses message with multiple level deep conditions 2', () => {
    template.value = 'Hello, ';

    const condition1 = getCondition1();

    condition1.blocks[2].children = [getCondition3()];
    condition1.blocks[1].children = [getCondition2()];
    template.children = [condition1];

    expect(messageGenerator(vars, template)).toEqual(
      "Hello, I'm John! My second name is Doe. So that's it. Nice to meet you."
    );

    vars.firstname = '';

    expect(messageGenerator(vars, template)).toEqual(
      "Hello, you can call me Slave. I'm working at Burger King. It has been going on for almost two years. Nice to meet you."
    );
  });
});
