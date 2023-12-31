export const MAX_VARS = 12;

export const REGEX = /[^a-zа-я0-9]/iu;

export const MAX_VAR_LENGTH = 20;

export enum TOOLTIP_MESSAGE {
  length = `Max symbols length is 20`,
  double = 'Variable is already exists',
  max = 'Max count of variables is 12',
  regex = 'Only letters or numbers'
}
