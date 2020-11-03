const { ImporterFactory } = require('xlsx-import/lib/ImporterFactory');
const { getInvoiceConfig } = require('./configs/invoiceConfig');

const factory = new ImporterFactory();

const importInvoice = async invoicePath => {
    const config = getInvoiceConfig();

    const importer = await factory.from(invoicePath);

    const { date, dueDate } = importer.getAllItems(config.misc)[0];
    const seller = importer.getAllItems(config.seller)[0];
    const buyer = importer.getAllItems(config.buyer)[0];
    const items = importer.getAllItems(config.items);

    const total = items.reduce((p, c) => p + c.price, 0);

    return {
        date,
        dueDate,
        seller,
        buyer,
        items,
        total,
    };
};

module.exports = { importInvoice };
