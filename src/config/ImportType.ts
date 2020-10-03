export enum ImportType {
    // listVerticalStrategy
    List = 'list',
    Vertical = 'vertical',
    ListVertical = 'list-vertical',

    // singleObjectStrategy
    Object = 'object',
    Singleton = 'singleton',
    Single = 'single',
}

export const IMPORT_TYPE_DEFAULT = ImportType.ListVertical;
