import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import { Importer } from 'xlsx-import/lib/Importer';
import { getInvoiceConfig, Invoice } from './invoice/invoiceConfig';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    invoice: Invoice | null = null;

    private onDownloadInvoice(): Promise<Blob> {
        return fetch('assets/invoice.xlsx').then((r) => r.blob());
    }

    private importInvoice(importer: any): Invoice {
        const config = getInvoiceConfig();

        const { date, dueDate } = importer.getAllItems(config.misc)[0];
        const seller = importer.getAllItems(config.seller)[0];
        const buyer = importer.getAllItems(config.buyer)[0];
        const items = importer.getAllItems(config.items);

        const total = items.reduce((p: any, c: any) => p + c.price, 0);

        return {
            buyer,
            date,
            dueDate,
            items,
            seller,
            total,
        };
    }

    async onUpload(): Promise<void> {
        const invoiceFile = await this.onDownloadInvoice();
        const reader = new FileReader();
        reader.readAsArrayBuffer(invoiceFile);
        reader.addEventListener('loadend', async () => {
            if (reader.result instanceof ArrayBuffer) {
                const wb = new Workbook();
                await wb.xlsx.load(reader.result);
                const importer = new Importer(wb);
                this.invoice = this.importInvoice(importer);
            }
        });
    }
}
