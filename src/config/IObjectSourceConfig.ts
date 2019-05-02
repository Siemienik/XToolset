import IFieldConfig from './IFieldConfig';
import ISourceConfig from './ISourceConfig';

export default interface IObjectSourceConfig extends ISourceConfig {
    fields: IFieldConfig[];
}
