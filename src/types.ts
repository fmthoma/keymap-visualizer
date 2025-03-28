export const keyboards = ['Crkbd', 'Ergodox'] as const;

export type Keyboard = (typeof keyboards)[number];
