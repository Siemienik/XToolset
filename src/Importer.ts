import { Workbook } from 'exceljs';
import IListSourceConfig from './config/IListSourceConfig';
import IObjectSourceConfig from './config/IObjectSourceConfig';
import ISourceConfig from './config/ISourceConfig';
import IImporter from './IImporter';

export default class Importer implements IImporter {
    constructor(private wb: Workbook) {}

    public GetAllItems<T>(cfg: ISourceConfig): T[] {
        const ws = this.wb.getWorksheet(cfg.worksheet);
        const MAPPER_DEFAULT = (v: string) => v;

        const result: T[] = [];

        switch (cfg.type) {
            case 'object':
                const objectCfg = cfg as IObjectSourceConfig;

                const singleton: { [id: string]: any } = {};

                objectCfg.fields.forEach(fieldCfg => {
                    const mapper = fieldCfg.mapper || MAPPER_DEFAULT;
                    singleton[fieldCfg.key] = mapper(ws.getCell(fieldCfg.row, fieldCfg.col).text);
                });

                result.push(singleton as T);

                break;
            case 'list':
            default:
                const listCfg = cfg as IListSourceConfig;

                ws.eachRow((row, i) => {
                    if (i <= listCfg.rowOffset) {
                        return;
                    }

                    const item: { [id: string]: any } = {};

                    listCfg.columns.forEach(colCfg => {
                        const mapper = colCfg.mapper || MAPPER_DEFAULT;
                        item[colCfg.key] = mapper(row.getCell(colCfg.index).text);
                    });

                    result.push(item as T);
                });

                break;
        }

        return result;
    }
}
