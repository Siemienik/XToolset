import { ValueMapper } from '../abstracts/ValueMapper';

export const upperCaseMapper: ValueMapper<string> = value => value.toUpperCase();
