export interface ICondition<T> {
  id: string;
  ifBlock: T;
  thenBlock: T;
  elseBlock: T;
}

export type TemplateBlock = {
  name: string;
  value: string;
  children: ICondition<TemplateBlock>[];
};

export type FootBlock = {
  value: string;
};

export interface ITemplate {
  head: TemplateBlock;
  foot: FootBlock;
}

export type PreloadData = {
  arrVarNames: string[];
  template: ITemplate | null;
};
