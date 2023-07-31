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

export type SetTemplate = (callback: (prev: ITemplateBlock) => ITemplateBlock) => void;

export type SetVars = (callback: (prev: string[]) => string[]) => void;
