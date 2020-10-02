import { Workbook } from 'exceljs';
import { IMPORT_TYPE_DEFAULT, ImportType } from './config/ImportType';
import ISourceConfig from './config/ISourceConfig';
import IImporter from './IImporter';
import { getStrategyByType } from './Strategies';

// todo obsolete default export
export default class Importer implements IImporter {
    constructor(private wb: Workbook) {}

    // todo obsolete and rename to loverCase
    public GetAllItems<T>(cfg: ISourceConfig): T[] {
        const { worksheet } = cfg;
        const type = (cfg.type as ImportType) || IMPORT_TYPE_DEFAULT;
        const ws = this.wb.getWorksheet(worksheet);

        return getStrategyByType(type)(cfg, ws);
    }
}
