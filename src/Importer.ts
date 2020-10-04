import { Workbook } from 'exceljs';
import { IMPORT_TYPE_DEFAULT, ImportType } from './config/ImportType';
import { ISourceConfig } from './config/ISourceConfig';
import { IImporter } from './IImporter';
import { getStrategyByType } from './strategies';

export class Importer implements IImporter {
    constructor(private wb: Workbook) {}

    // todo obsolete and rename to loverCase
    public GetAllItems<T>(cfg: ISourceConfig): T[] {
        const { worksheet } = cfg;
        const type = (cfg.type as ImportType) || IMPORT_TYPE_DEFAULT;
        const ws = this.wb.getWorksheet(worksheet);

        return getStrategyByType(type)(cfg, ws);
    }
}

/** @deprecated Default exports will be removed in January 2021. Please to use brackets (`{ Importer }`). */
// tslint:disable-next-line:no-empty-interface max-classes-per-file
export default class ImporterLegacy extends Importer {};
