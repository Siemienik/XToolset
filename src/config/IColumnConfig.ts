export interface IColumnConfig {
    index: number;
    key: string;
    mapper?: (id: string) => any;
}

/** @deprecated Default exports will be removed in January 2021. Please to use brackets (`{ IColumnConfig }`). */
// tslint:disable-next-line:no-empty-interface
export default interface IColumnConfigLegacy extends IColumnConfig {}
