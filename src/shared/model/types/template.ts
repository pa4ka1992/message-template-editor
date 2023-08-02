export interface ICondition {
  id: number;
  blocks: ITemplateBlock[];
  split: ITemplateBlock;
}

export interface ITemplateBlock {
  name: string;
  value: string;
  children: ICondition[];
}

export type SetTemplate = (callback: (prev: ITemplateBlock) => ITemplateBlock) => void;

export type SetVars = (callback: (prev: string[]) => string[]) => void;
