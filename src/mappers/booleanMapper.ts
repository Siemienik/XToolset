import { ValueMapper } from '../abstracts/ValueMapper';

const removeTextAfterValidNumber = (value: string) => value?.replace(/(\d)\D+$/g, '$1');

export const booleanMapper: ValueMapper<boolean> = value =>
    Boolean(Number(removeTextAfterValidNumber(value)));
