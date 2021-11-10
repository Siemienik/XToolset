import { ValueMapper } from '../abstracts/ValueMapper';

// noinspection SuspiciousTypeOfGuard
export const dateMapper: ValueMapper<Date> = value => new Date(typeof value === 'string' ? value : 'invalid');
