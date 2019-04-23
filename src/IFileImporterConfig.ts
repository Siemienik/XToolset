import IFileImporterColumnConfig from './IFileImporterColumnConfig';

export default interface IFileImporterConfig {
    name: string;
    worksheet: string;
    columns: IFileImporterColumnConfig[];
    rowOffset: number;
}
