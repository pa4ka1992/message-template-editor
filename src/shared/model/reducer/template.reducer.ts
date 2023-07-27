import { ICondition, ITemplate } from 'shared';

export enum TEMPLATE_KIND {
  setVal = 'set_value',
  setSplit = 'set_split_value',
  setChildren = 'set_children',
  setTemplate = 'set_template'
}

type SetVal = { type: TEMPLATE_KIND.setVal | TEMPLATE_KIND.setSplit; payload: string };

type SetTemplate = { type: TEMPLATE_KIND.setTemplate; payload: ITemplate };

type SetChildren = { type: TEMPLATE_KIND.setChildren; payload: ICondition[] };

export type TemplateActions = SetVal | SetTemplate | SetChildren;

export function templateReducer(state: ITemplate, action: TemplateActions) {
  switch (action.type) {
    case TEMPLATE_KIND.setVal: {
      return {
        ...state,
        value: action.payload
      };
    }

    case TEMPLATE_KIND.setSplit: {
      return {
        ...state,
        split: action.payload
      };
    }

    case TEMPLATE_KIND.setChildren: {
      return {
        ...state,
        children: action.payload
      };
    }

    case TEMPLATE_KIND.setTemplate: {
      return {
        ...action.payload
      };
    }

    default:
      throw Error('Unknown action');
  }
}
