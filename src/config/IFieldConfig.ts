export default interface IFieldConfig {
    row: number;
    col: number | string;
    key: string;
    mapper?: (id: string) => any;
}
