import ISourceConfig from './config/ISourceConfig';

// todo obsolete default export
export default interface IImporter {
    // todo obsolete and rename to loverCase
    GetAllItems<T>(people: ISourceConfig): T[];
}
