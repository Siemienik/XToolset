import ISourceConfig from './config/ISourceConfig';

export default interface IImporter {
    GetAllItems<T>(people: ISourceConfig): T[];
}
