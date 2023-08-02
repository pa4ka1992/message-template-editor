import { ICondition, ITemplateBlock, BLOCK_NAME } from 'shared';

export class ConditionObj implements ICondition {
  id: number;
  blocks: ITemplateBlock[];
  split: ITemplateBlock;

  constructor(splitValue: string) {
    this.id = Date.now();
    this.blocks = [
      { name: BLOCK_NAME.if, value: '', children: [] },
      { name: BLOCK_NAME.then, value: '', children: [] },
      { name: BLOCK_NAME.else, value: '', children: [] }
    ];
    this.split = { name: BLOCK_NAME.split, value: splitValue, children: [] };
  }
}
