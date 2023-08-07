const MATCH_BRACKET = {
  '{': 'U+007B',
  '}': 'U+007D',
  'U+007B': '{',
  'U+007D': '}'
};

export const replaceBrackets = (str: string) => {
  return str.replace(/[{}]/g, (key) => MATCH_BRACKET[key as keyof typeof MATCH_BRACKET]);
};

export const restoreString = (str: string) => {
  return str.replace(/U\+007[BD]/g, (key) => MATCH_BRACKET[key as keyof typeof MATCH_BRACKET]);
};
