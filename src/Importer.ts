import { Workbook } from 'exceljs';
import { IMPORT_TYPE_DEFAULT, ImportType } from './config/ImportType';
import { ISourceConfig } from './config/ISourceConfig';
import { IImporter } from './IImporter';
import IImporterLegacy from './IImporter';
import { getStrategyByType } from './strategies';

export class Importer implements IImporter {
    constructor(private wb: Workbook) {}

    public getAllItems<T>(cfg: ISourceConfig): T[] {
        const { worksheet } = cfg;
        const type = (cfg.type as ImportType) || IMPORT_TYPE_DEFAULT;
        const ws = this.wb.getWorksheet(worksheet);

        return getStrategyByType(type)(cfg, ws);
    }
}

/** @deprecated Default exports will be removed in January 2021. Please to use brackets (`{ Importer }`). */
// tslint:disable-next-line:no-empty-interface max-classes-per-file
export default class ImporterLegacy extends Importer implements IImporterLegacy {
    /** @deprecated Refactoring performed, please to use `import { Importer }` and rename to camelCase version `getAllItems`. */
    public GetAllItems<T>(cfg: ISourceConfig): T[] {
        return this.getAllItems<T>(cfg);
    }
};
