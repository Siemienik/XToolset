import { ValueMapper } from '../abstracts/ValueMapper';

export const integerMapper: ValueMapper<number> = value => Number.parseInt(value, 10);
