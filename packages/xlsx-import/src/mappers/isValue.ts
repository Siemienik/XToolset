import { ValueMapper } from '../abstracts/ValueMapper';

export type IsValue = (acceptedValues: string[]) => ValueMapper<boolean>;

export const isValue: IsValue = (acceptedValues: string[]) => value =>
    acceptedValues.map(e => e.toLowerCase()).includes(value.toLowerCase());
