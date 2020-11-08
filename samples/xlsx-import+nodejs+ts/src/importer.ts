import { ImporterFactory } from 'xlsx-import/lib/ImporterFactory';
import { getInvoiceConfig, IBuyer, IItem, IMisc, ISeller } from './configs/invoiceConfig';

const factory = new ImporterFactory();

export const importInvoice = async (invoicePath: string) => {
    const config = getInvoiceConfig();

    const importer = await factory.from(invoicePath);

    const { date, dueDate } = importer.getAllItems<IMisc>(config.misc)[0];
    const seller = importer.getAllItems<ISeller>(config.seller)[0];
    const buyer = importer.getAllItems<IBuyer>(config.buyer)[0];
    const items = importer.getAllItems<IItem>(config.items);

    const total = items.reduce((p, c) => p + c.price, 0);

    return {
        buyer,
        date,
        dueDate,
        items,
        seller,
        total,
    };
};
