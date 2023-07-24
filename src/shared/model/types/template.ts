export interface ICondition<T> {
  id: number;
  ifBlock: T;
  thenBlock: T;
  elseBlock: T;
}

export type TemplateBlock = {
  name: string;
  value: string;
  children: ICondition<TemplateBlock>[];
};

export interface ITemplate {
  head: TemplateBlock;
  foot: TemplateBlock;
}
