import { ValueMapper } from '../abstracts/ValueMapper';
import { isEmpty } from './isEmpty';

export const isFilled: ValueMapper<boolean> = value => !isEmpty(value)
