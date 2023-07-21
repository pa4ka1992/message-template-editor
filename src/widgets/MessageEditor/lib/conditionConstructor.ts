import { uid } from 'uid';
import { ICondition, TemplateBlock } from 'shared';

export class ConditionObj implements ICondition<TemplateBlock> {
  id: string;
  ifBlock: TemplateBlock;
  elseBlock: TemplateBlock;
  thenBlock: TemplateBlock;

  constructor() {
    this.id = uid();
    this.ifBlock = { name: 'if', value: '', children: [] };
    this.elseBlock = { name: 'else', value: '', children: [] };
    this.thenBlock = { name: 'then', value: '', children: [] };
  }
}
