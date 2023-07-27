import { ICondition, TemplateBlock, BLOCK_NAME } from 'shared';

export class ConditionObj implements ICondition {
  id: number;
  blocks: TemplateBlock[];

  constructor() {
    this.id = Date.now();
    this.blocks = [
      { name: BLOCK_NAME.if, value: '', children: [] },
      { name: BLOCK_NAME.then, value: '', children: [] },
      { name: BLOCK_NAME.else, value: '', children: [] }
    ];
  }
}
