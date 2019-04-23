export default interface IFileImporterColumnConfig {
    index: number;
    key: string;
    mapper?: (id: string) => any;
}
