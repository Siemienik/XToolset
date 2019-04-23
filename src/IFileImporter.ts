import IFileImporterConfig from "./IFileImporterConfig";

export default interface IFileImporter {
    GetAllItems<T>(people: IFileImporterConfig): T[];
}