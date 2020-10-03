import { Worksheet } from 'exceljs';
import { IMPORT_TYPE_DEFAULT, ImportType } from '../config/ImportType';
import { ISourceConfig } from '../config/ISourceConfig';
import { ImportStrategy } from './ImportStrategy';
import { listVerticalStrategy } from './listVerticalStrategy';

export const invalidTypeStrategy: ImportStrategy = <T>(cfg: ISourceConfig, ws: Worksheet): T[] => {
    // tslint:disable-next-line:no-console
    console.warn(
        `Used '${IMPORT_TYPE_DEFAULT}' type instead of not supported '${cfg.type}'. ` +
            `Currently supported are: ${Object.values(ImportType).join()}.`,
    );

    return listVerticalStrategy(cfg, ws);
};
