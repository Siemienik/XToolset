import IColumnConfig from './IColumnConfig';
import ISourceConfig from './ISourceConfig';

// todo obsolete default export
export default interface IListSourceConfig extends ISourceConfig {
    columns: IColumnConfig[];
    rowOffset: number;
}
