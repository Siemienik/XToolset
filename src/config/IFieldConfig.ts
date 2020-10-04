export interface IFieldConfig {
    row: number;
    col: number | string;
    key: string;
    mapper?: (id: string) => any;
}

/** @deprecated Default exports will be removed in January 2021. Please to use brackets (`{ IFieldConfig }`). */
// tslint:disable-next-line:no-empty-interface
export default interface IFieldConfigLegacy extends IFieldConfig {}
