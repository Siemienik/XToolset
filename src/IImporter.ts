import { ISourceConfig } from './config/ISourceConfig';

export interface IImporter {
    // todo obsolete and rename to loverCase
    GetAllItems<T>(people: ISourceConfig): T[];
}

/** @deprecated Default exports will be removed in January 2021. Please to use brackets (`{ IImporter }`). */
// tslint:disable-next-line:no-empty-interface
export default interface IImporterLegacy extends IImporter {};
