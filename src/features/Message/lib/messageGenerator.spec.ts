import { VARS, TEMPLATE } from './mock';
import { messageGenerator } from './messageGenerator';

test('check', () => {
  VARS.firstname = 'John';
  VARS.lastname = 'Doe';

  TEMPLATE.children = [];
  TEMPLATE.value = '{ FIRSTNAME } ';
  TEMPLATE.split = '{ LASTNAME }';

  const message = messageGenerator(VARS, TEMPLATE);

  expect(message).toEqual('John Doe');
});
