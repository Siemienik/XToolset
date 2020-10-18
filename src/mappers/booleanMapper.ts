import { ValueMapper } from '../abstracts/ValueMapper';

export const booleanMapper: ValueMapper<Boolean> = value => Boolean(Number(value));
