import { IColumnConfig } from './IColumnConfig';
import { ISourceConfig } from './ISourceConfig';

export interface IListSourceConfig extends ISourceConfig {
    columns: IColumnConfig[];
    rowOffset: number;
}

/** @deprecated Default exports will be removed in January 2021. Please to use brackets (`{ IListSourceConfig }`). */
// tslint:disable-next-line:no-empty-interface
export default interface IListSourceConfigLegacy extends IListSourceConfig {};
