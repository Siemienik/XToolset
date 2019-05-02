export default interface IColumnConfig {
    index: number;
    key: string;
    mapper?: (id: string) => any;
}
