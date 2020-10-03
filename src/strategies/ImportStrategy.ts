import { Worksheet } from 'exceljs';
import ISourceConfig from '../config/ISourceConfig';

export type ImportStrategy = <T>(cfg: ISourceConfig, ws: Worksheet) => T[];
