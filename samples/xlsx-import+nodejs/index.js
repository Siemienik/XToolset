const { importInvoice } = require('./importer');

importInvoice(__dirname + '/invoice.xlsx').then(invoice => {
    console.log(JSON.stringify(invoice, null, 2));

    if (process.argv[2] === 'test') {
        const snapshot = require('./result.snapshot');
        if (JSON.stringify(snapshot) !== JSON.stringify(invoice)) {
            throw new Error('snapshot dismatch');
        }
    }
});
