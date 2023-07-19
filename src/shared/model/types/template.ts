export interface ISubCondition<T> {
  if: T;
  then: T;
  else: T;
}

type ConditionRow = {
  value: string;
  children: ISubCondition<ConditionRow>[];
};

export interface ITemplate {
  value: string;
  children: ISubCondition<ConditionRow>[];
  splitValue?: string;
}

export type PreloadData = {
  arrVarNames: string[];
  template: ITemplate | null;
};
