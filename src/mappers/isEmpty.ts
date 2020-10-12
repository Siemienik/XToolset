import { ValueMapper } from '../abstracts/ValueMapper';

export const isEmpty: ValueMapper<boolean> = value => value == null || value === '';
