import { IFieldConfig } from './IFieldConfig';
import { ISourceConfig } from './ISourceConfig';

export interface IObjectSourceConfig extends ISourceConfig {
    fields: IFieldConfig[];
}

/** @deprecated Default exports will be removed in January 2021. Please to use brackets (`{ IObjectSourceConfig }`). */
// tslint:disable-next-line:no-empty-interface
export default interface IObjectSourceConfigLegacy extends IObjectSourceConfig {}
