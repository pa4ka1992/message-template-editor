export interface ICondition {
  id: number;
  blocks: TemplateBlock[];
}

export type TemplateBlock = {
  name: string;
  value: string;
  children: ICondition[];
};

export interface ITemplate extends TemplateBlock {
  split: string;
}
