import { ICondition, TemplateBlock, BLOCK_NAME } from 'shared';

export class ConditionObj implements ICondition<TemplateBlock> {
  id: number;
  ifBlock: TemplateBlock;
  elseBlock: TemplateBlock;
  thenBlock: TemplateBlock;

  constructor() {
    this.id = Date.now();
    this.ifBlock = { name: BLOCK_NAME.if, value: '', children: [] };
    this.elseBlock = { name: BLOCK_NAME.else, value: '', children: [] };
    this.thenBlock = { name: BLOCK_NAME.then, value: '', children: [] };
  }
}
