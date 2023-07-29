import { BLOCK_NAME } from 'shared';

export const VARS = {
  firstname: '',
  lastname: '',
  company: '',
  position: ''
};

export const TEMPLATE = {
  name: BLOCK_NAME.head,
  children: [
    {
      id: 1690639685817,
      blocks: [
        {
          name: BLOCK_NAME.if,
          value: '',
          children: [
            {
              id: 1690639687557,
              blocks: [
                {
                  name: BLOCK_NAME.if,
                  value: '',
                  children: []
                },
                {
                  name: BLOCK_NAME.then,
                  value: '',
                  children: []
                },
                {
                  name: BLOCK_NAME.else,
                  value: '',
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: BLOCK_NAME.then,
          value: '',
          children: [
            {
              id: 1690639690573,
              blocks: [
                {
                  name: BLOCK_NAME.if,
                  value: '',
                  children: []
                },
                {
                  name: BLOCK_NAME.then,
                  value: '',
                  children: []
                },
                {
                  name: BLOCK_NAME.else,
                  value: '',
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: BLOCK_NAME.else,
          value: '',
          children: [
            {
              id: 1690639692933,
              blocks: [
                {
                  name: BLOCK_NAME.if,
                  value: '',
                  children: []
                },
                {
                  name: BLOCK_NAME.then,
                  value: '',
                  children: []
                },
                {
                  name: BLOCK_NAME.else,
                  value: '',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  value: '',
  split: ''
};
