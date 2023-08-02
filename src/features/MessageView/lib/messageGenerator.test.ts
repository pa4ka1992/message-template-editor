import { VARS, TEMPLATE } from './mock';
import { messageGenerator } from './messageGenerator';

test('parse with conditions', () => {
  VARS.firstname = 'John';
  VARS.lastname = 'Doe';
  VARS.company = 'Burger King';

  TEMPLATE.value = '{ FIRSTNAME } { LASTNAME }! ';
  // TEMPLATE.split = ' Bye';
  TEMPLATE.children[0].blocks[0].value = '{ COMPANY }';
  TEMPLATE.children[0].blocks[1].value = 'You are working at { COMPANY }.';
  TEMPLATE.children[0].blocks[2].value = 'Where are you working?';

  const message = messageGenerator(VARS, TEMPLATE);

  expect(message).toEqual('John Doe! You are working at Burger King. Bye');
});
