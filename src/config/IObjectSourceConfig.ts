import IFieldConfig from './IFieldConfig';
import ISourceConfig from './ISourceConfig';

// todo obsolete default export
export default interface IObjectSourceConfig extends ISourceConfig {
    fields: IFieldConfig[];
}
