import IColumnConfig from './IColumnConfig';
import ISourceConfig from './ISourceConfig';

export default interface IListSourceConfig extends ISourceConfig {
    columns: IColumnConfig[];
    rowOffset: number;
}
