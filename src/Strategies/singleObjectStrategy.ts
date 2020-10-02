import { Worksheet } from 'exceljs';
import IObjectSourceConfig from '../config/IObjectSourceConfig';
import ISourceConfig from '../config/ISourceConfig';
import { MAPPER_DEFAULT } from '../mappers';
import { ImportStrategy } from './ImportStrategy';

export const singleObjectStrategy: ImportStrategy = <T>(cfg: ISourceConfig, ws: Worksheet): T[] => {
    const objectCfg = cfg as IObjectSourceConfig;

    const singleton: { [id: string]: any } = {};

    objectCfg.fields.forEach(fieldCfg => {
        const mapper = fieldCfg.mapper || MAPPER_DEFAULT;
        singleton[fieldCfg.key] = mapper(ws.getCell(fieldCfg.row, fieldCfg.col).text);
    });

    return [singleton as T];
};
