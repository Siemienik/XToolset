import { ValueMapper } from '../abstracts/ValueMapper';

export const numberMapper: ValueMapper<number> = value => Number.parseFloat(value);
