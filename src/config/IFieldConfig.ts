import { ValueMapper } from '../abstracts/ValueMapper';

export interface IFieldConfig {
    row: number;
    col: number | string;
    key: string;
    mapper?: ValueMapper<any>;
}

/** @deprecated Default exports will be removed in January 2021. Please to use brackets (`{ IFieldConfig }`). */
// tslint:disable-next-line:no-empty-interface
export default interface IFieldConfigLegacy extends IFieldConfig {}
