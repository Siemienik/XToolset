import { join } from 'path';
import { importInvoice } from './importer';

importInvoice(join(__dirname, '../invoice.xlsx')).then(invoice => {
    // tslint:disable-next-line:no-console
    console.log(JSON.stringify(invoice, null, 2));
});
