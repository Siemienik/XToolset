import { ISourceConfig } from './config/ISourceConfig';

export interface IImporter {
    getAllItems<T>(config: ISourceConfig): T[];
    getFirstItem<T>(config: ISourceConfig): T;
}

/** @deprecated Default exports will be removed in January 2021. Please to use brackets (`{ IImporter }`). */
// tslint:disable-next-line:no-empty-interface
export default interface IImporterLegacy {
    /** @deprecated Refactoring performed, please to use `import { IImporter }` and rename to camelCase version `getAllItems`. */
    GetAllItems<T>(config: ISourceConfig): T[];
}

/** @deprecated Default exports will be removed in January 2021. Please to use brackets (`{ IImporter }`). */
// tslint:disable-next-line:no-empty-interface
export default interface IImporterLegacy extends IImporter {}
