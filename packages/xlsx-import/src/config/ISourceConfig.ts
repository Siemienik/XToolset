import { ImportType } from './ImportType';

export interface ISourceConfig {
    type?: ImportType | string;
    worksheet: string;
}

/** @deprecated Default exports will be removed in January 2021. Please to use brackets (`{ ISourceConfig }`). */
// tslint:disable-next-line:no-empty-interface
export default interface ISourceConfigLegacy extends ISourceConfig {}
