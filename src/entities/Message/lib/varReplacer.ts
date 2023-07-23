import { VarsObj } from './messageGenerator';

export const varReplacer = (vars: VarsObj) => {
  return (text: string) => {
    let initial = text;

    for (const varName in vars) {
      initial = initial.replaceAll(`{${varName}}`, vars[varName]);
    }

    return initial;
  };
};
