export interface ISeller {
    name: string;
    taxIdNumber: string;
    address: string;
    accountNo: string;
}

export interface IBuyer {
    name: string;
    taxIdNumber: string;
    address: string;
}

export interface IMisc {
    date: Date;
    dueDate: Date;
}

export interface IItem {
    item: string;
    unitPrice: number;
    quantity: number;
    price: number;
}

export interface Invoice {
    seller: ISeller;
    buyer: IBuyer;
    date: IMisc['date'];
    dueDate: IMisc['dueDate'];
    total: number;
    items: IItem[];
}

export const getInvoiceConfig = () => ({
    seller: {
        worksheet: 'Invoice',
        type: 'object',
        fields: [
            { row: 2, col: 1, key: 'name' },
            { row: 4, col: 2, key: 'taxIdNumber' },
            { row: 3, col: 1, key: 'address' },
            { row: 9, col: 4, key: 'accountNo' },
        ],
    },

    buyer: {
        worksheet: 'Invoice',
        type: 'object',
        fields: [
            { row: 2, col: 5, key: 'name' },
            { row: 4, col: 6, key: 'taxIdNumber' },
            { row: 3, col: 5, key: 'address' },
        ],
    },

    misc: {
        worksheet: 'Invoice',
        type: 'object',
        fields: [
            { row: 6, col: 5, key: 'date', mapper: (v: string) => new Date(v) },
            { row: 7, col: 5, key: 'dueDate', mapper: (v: string) => new Date(v) },
        ],
    },

    items: {
        worksheet: 'Invoice',
        type: 'list',
        rowOffset: 13,
        columns: [
            { index: 2, key: 'item' },
            { index: 4, key: 'unitPrice', mapper: (v: string) => Number(v) },
            { index: 5, key: 'quantity', mapper: (v: string) => Number(v) },
            { index: 6, key: 'price', mapper: (v: string) => Number(v) },
        ],
    },
});
