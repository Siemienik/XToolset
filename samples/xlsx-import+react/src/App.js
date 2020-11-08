import { Workbook } from 'exceljs';
import React, { useCallback, useState } from 'react';
import { Importer } from 'xlsx-import/lib/Importer';
import XlsxImportLogo from './components/XlsxImportLogo';
import './App.css';
import { getInvoiceConfig, Invoice } from './components/Invoice';

const importInvoice = importer => {
    const config = getInvoiceConfig();

    const { date, dueDate } = importer.getAllItems(config.misc)[0];
    const seller = importer.getAllItems(config.seller)[0];
    const buyer = importer.getAllItems(config.buyer)[0];
    const items = importer.getAllItems(config.items);

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

async function onDownloadInvoice() {
    return fetch('/invoice.xlsx').then(r => r.blob());
}

function App() {
    const [invoice, setInvoice] = useState(null);
    const onUpload = useCallback(async () => {
        const invoiceFile = await onDownloadInvoice();
        const reader = new FileReader();
        reader.readAsArrayBuffer(invoiceFile);
        reader.addEventListener('loadend', async e => {
            const wb = new Workbook();
            await wb.xlsx.load(reader.result);
            const importer = new Importer(wb);
            setInvoice(importInvoice(importer));
        });
    }, []);
    return (
        <div className="App">
            <XlsxImportLogo />
            <main className="App-header pt6 pb4">
                <h1>
                    <a
                        className="link underline dim white"
                        href="https://github.com/Siemienik/xlsx-import/blob/master/samples/react"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        React sample
                    </a>
                </h1>
                <p>Click button bellow and see xlsx-import in action</p>
                <button className="f6" type="button" onClick={onUpload} disabled={Boolean(invoice)}>
                    Download and parse invoice
                </button>
                {invoice && <Invoice invoice={invoice} />}
            </main>
        </div>
    );
}

export default App;
