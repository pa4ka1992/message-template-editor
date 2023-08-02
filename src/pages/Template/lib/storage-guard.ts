import { ITemplateBlock } from 'shared';

const KEYS = ['name', 'value', 'children'];

export const isTemplate = (data: unknown): data is ITemplateBlock => {
  if (typeof data === 'object' && data) {
    const isHasKeys = KEYS.every((key) => key in data);

    return isHasKeys;
  }

  return false;
};

export const isVarsArray = (data: unknown): data is string[] => {
  if (Array.isArray(data)) {
    return data.every((varName) => typeof varName === 'string');
  }

  return false;
};
