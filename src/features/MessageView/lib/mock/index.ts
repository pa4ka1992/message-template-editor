import { BLOCK_NAME, ITemplateBlock } from 'shared';
import { VarsObj } from '../messageGenerator';

const ifblock: ITemplateBlock = {
  name: BLOCK_NAME.if,
  value: '',
  children: []
};

const elseBlock: ITemplateBlock = {
  name: BLOCK_NAME.else,
  value: '',
  children: []
};

const thenBlock: ITemplateBlock = {
  name: BLOCK_NAME.then,
  value: '',
  children: []
};

const splitBlock: ITemplateBlock = {
  name: BLOCK_NAME.split,
  value: '',
  children: []
};

export const VARS: VarsObj = {
  firstname: '',
  lastname: '',
  company: '',
  position: ''
};

export const TEMPLATE: ITemplateBlock = {
  name: BLOCK_NAME.head,
  value: '',
  children: [
    {
      id: 1,
      split: splitBlock,
      blocks: [
        {
          name: BLOCK_NAME.if,
          value: '',
          children: [
            {
              id: 2,
              blocks: [ifblock, elseBlock, thenBlock],
              split: splitBlock
            }
          ]
        },
        {
          name: BLOCK_NAME.then,
          value: '',
          children: [
            {
              id: 3,
              blocks: [ifblock, elseBlock, thenBlock],
              split: splitBlock
            }
          ]
        },
        {
          name: BLOCK_NAME.else,
          value: '',
          children: [
            {
              id: 4,
              blocks: [ifblock, elseBlock, thenBlock],
              split: splitBlock
            }
          ]
        }
      ]
    }
  ]
};
