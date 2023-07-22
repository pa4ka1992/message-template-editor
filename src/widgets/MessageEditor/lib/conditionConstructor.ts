import { uid } from 'uid';
import { ICondition, TemplateBlock, BLOCK_NAME } from 'shared';

export class ConditionObj implements ICondition<TemplateBlock> {
  id: string;
  ifBlock: TemplateBlock;
  elseBlock: TemplateBlock;
  thenBlock: TemplateBlock;

  constructor() {
    this.id = uid();
    this.ifBlock = { name: BLOCK_NAME.if, value: '', children: [] };
    this.elseBlock = { name: BLOCK_NAME.else, value: '', children: [] };
    this.thenBlock = { name: BLOCK_NAME.then, value: '', children: [] };
  }
}
