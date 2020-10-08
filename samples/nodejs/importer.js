const ImporterFactory = require('xlsx-import/lib/ImporterFactory').default;
const { getInvoiceConfig } = require('./configs/invoiceConfig');

const factory = new ImporterFactory();

const importInvoice = async (invoicePath) => {
    const config = getInvoiceConfig();

    const importer = await factory.From(invoicePath);

    const {date, dueDate} = importer.GetAllItems(config.misc)[0];
    const seller = importer.GetAllItems(config.seller)[0];
    const buyer = importer.GetAllItems(config.buyer)[0];
    const items = importer.GetAllItems(config.items);

    const total = items.reduce((p, c) => p + c.price, 0);

    return {
        date,
        dueDate,
        seller,
        buyer,
        items,
        total
    }
}

module.exports = {importInvoice};
