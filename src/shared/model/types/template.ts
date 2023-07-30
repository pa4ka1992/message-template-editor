export interface ICondition {
  id: number;
  blocks: ITemplateBlock[];
}

export interface ITemplateBlock {
  name: string;
  value: string;
  children: ICondition[];
  split?: string;
}
