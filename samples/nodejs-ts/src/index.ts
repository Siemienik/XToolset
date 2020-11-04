import { join } from 'path';
import { importInvoice } from './importer';

importInvoice(join(__dirname, '../invoice.xlsx')).then(invoice => {
    // tslint:disable-next-line:no-console
    console.log(JSON.stringify(invoice, null, 2));

    if (process.argv[2] === 'test') {
        const snapshot = require('../result.snapshot');
        if (JSON.stringify(snapshot) !== JSON.stringify(invoice)) {
            throw new Error('snapshot dismatch');
        }
    }
});
