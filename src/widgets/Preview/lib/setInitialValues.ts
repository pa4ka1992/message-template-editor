export const setInitialValues = (vars: string[]) => {
  return vars.map((varName) => ({ name: varName, value: '' }));
};
