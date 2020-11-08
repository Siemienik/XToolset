import { ValueMapper } from '../abstracts/ValueMapper';

export interface IColumnConfig {
    index: number;
    key: string;
    mapper?: ValueMapper<any>;
}

/** @deprecated Default exports will be removed in January 2021. Please to use brackets (`{ IColumnConfig }`). */
// tslint:disable-next-line:no-empty-interface
export default interface IColumnConfigLegacy extends IColumnConfig {}
