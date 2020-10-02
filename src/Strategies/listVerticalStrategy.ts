import { Worksheet } from 'exceljs';
import IListSourceConfig from '../config/IListSourceConfig';
import ISourceConfig from '../config/ISourceConfig';
import { ImportStrategy } from './ImportStrategy';

export const listVerticalStrategy: ImportStrategy = <T>(cfg: ISourceConfig, ws: Worksheet): T[] => {
    const listCfg = cfg as IListSourceConfig;
    const result: T[] = [];
    ws.eachRow((row, i) => {
        if (i <= listCfg.rowOffset) {
            return;
        }

        const item: { [id: string]: any } = {};

        listCfg.columns.forEach(colCfg => {
            const mapper = colCfg.mapper || ((v: string) => v);
            item[colCfg.key] = mapper(row.getCell(colCfg.index).text);
        });

        result.push(item as T);
    });
    return result;
};
