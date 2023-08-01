import { BLOCK_NAME, ITemplateBlock } from 'shared';
import { VarsObj } from '../messageGenerator';

const ifblock: ITemplateBlock = {
  name: BLOCK_NAME.if,
  value: '',
  children: [],
  split: ''
};

const elseBlock: ITemplateBlock = {
  name: BLOCK_NAME.else,
  value: '',
  children: [],
  split: ''
};

const thenBlock: ITemplateBlock = {
  name: BLOCK_NAME.then,
  value: '',
  children: [],
  split: ''
};

export const VARS: VarsObj = {
  firstname: '',
  lastname: '',
  company: '',
  position: ''
};

export const TEMPLATE: ITemplateBlock = {
  name: BLOCK_NAME.head,
  children: [
    {
      id: 1,
      blocks: [
        {
          name: BLOCK_NAME.if,
          value: '',
          children: [
            {
              id: 2,
              blocks: [ifblock, elseBlock, thenBlock]
            }
          ],
          split: ''
        },
        {
          name: BLOCK_NAME.then,
          value: '',
          children: [
            {
              id: 3,
              blocks: [ifblock, elseBlock, thenBlock]
            }
          ],
          split: ''
        },
        {
          name: BLOCK_NAME.else,
          value: '',
          children: [
            {
              id: 4,
              blocks: [ifblock, elseBlock, thenBlock]
            }
          ],
          split: ''
        }
      ]
    }
  ],
  value: '',
  split: ''
};
