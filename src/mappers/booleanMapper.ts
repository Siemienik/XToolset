import { ValueMapper } from '../abstracts/ValueMapper';

export const booleanMapper: ValueMapper<boolean> = value =>
    Boolean(Number.parseFloat(value));
