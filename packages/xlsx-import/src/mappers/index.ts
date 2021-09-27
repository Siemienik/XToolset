import { stringMapper } from './stringMapper';

/** probably `MAPPER_DEFAULT` should never be changed. Designed for internal usages when mapper isn't precised. */
export const MAPPER_DEFAULT = stringMapper;
export { upperCaseMapper } from './upperCaseMapper';
export { lowerCaseMapper } from './lowerCaseMapper';
export { isEmpty } from './isEmpty';
export { isFilled } from './isFilled';
export { jsonMapper } from './jsonMapper';
export { splitMapper } from './splitMapper';
export { integerMapper } from './integerMapper';
export { booleanMapper } from './booleanMapper';
export { numberMapper } from './numberMapper';
export { isValue } from './isValue';
export { dateMapper } from './dateMapper';
