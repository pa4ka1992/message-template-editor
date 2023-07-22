import { VarsObj } from './messageGenerator';

export const varReplacer = (vars: VarsObj) => {
  return (text: string) => {
    const initial = text;

    for (const varName in vars) {
      initial.replaceAll(varName, vars[varName]);
    }

    return text;
  };
};
