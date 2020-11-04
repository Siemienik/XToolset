import { ValueMapper } from '../abstracts/ValueMapper';

export const isValueMapper: (acceptedValues: string[]) => ValueMapper<boolean> = (acceptedValues: string[]) => value =>
    acceptedValues.map(e => e.toLowerCase()).includes(value.toLowerCase());
