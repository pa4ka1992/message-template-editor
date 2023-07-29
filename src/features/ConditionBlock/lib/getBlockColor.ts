import { BLOCK_NAME } from 'shared';

export const getBlockColor = (blockName: string) => {
  switch (blockName) {
    case BLOCK_NAME.if:
      return 'var(--secondary-color-75)';

    case BLOCK_NAME.else:
      return 'var(--secondary-color-100)';

    default:
      return 'var(--success-color)';
  }
};
