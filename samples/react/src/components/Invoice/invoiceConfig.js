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
            { row: 6, col: 5, key: 'date', mapper: v => new Date(v) },
            { row: 7, col: 5, key: 'dueDate', mapper: v => new Date(v) },
        ],
    },

    items: {
        worksheet: 'Invoice',
        type: 'list',
        rowOffset: 13,
        columns: [
            { index: 2, key: 'item' },
            { index: 4, key: 'unitPrice', mapper: v => Number(v) },
            { index: 5, key: 'quantity', mapper: v => Number(v) },
            { index: 6, key: 'price', mapper: v => Number(v) },
        ],
    },
});
