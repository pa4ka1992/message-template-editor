import { ICondition, ITemplateBlock, BLOCK_NAME } from 'shared';

export class ConditionObj implements ICondition {
  id: number;
  blocks: ITemplateBlock[];

  constructor() {
    this.id = Date.now();
    this.blocks = [
      { name: BLOCK_NAME.if, value: '', children: [], split: '' },
      { name: BLOCK_NAME.then, value: '', children: [], split: '' },
      { name: BLOCK_NAME.else, value: '', children: [], split: '' }
    ];
  }
}
