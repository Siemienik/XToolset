<template>
    <div class="invoice-app">
        <XlsxImportLogo />
        <main class="invoice-header pt6 pb4">
            <h1>
                <a
                    class="link underline dim white"
                    href="https://github.com/Siemienik/xlsx-import/blob/master/samples/vue"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Vue sample
                </a>
            </h1>
            <p>Click button bellow and see xlsx-import in action</p>
            <button class="f6" type="button" @click="onUpload" :disabled="invoice">
                Download and parse invoice
            </button>
            <Invoice v-if="invoice" :invoice="invoice" />
        </main>
    </div>
</template>

<script>
import { Invoice, getInvoiceConfig } from '@/components/Invoice';
import XlsxImportLogo from '@/components/XlsxImportLogo';
import { Workbook } from 'exceljs';
import { Importer } from 'xlsx-import/lib/Importer';

export default {
    name: 'App',
    components: {
        Invoice,
        XlsxImportLogo,
    },
    props: {
        msg: String,
    },
    data() {
        return {
            invoice: null,
        };
    },
    methods: {
        onImportInvoice(importer) {
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
        },
        onDownloadInvoice() {
            return fetch('/invoice.xlsx').then(r => r.blob());
        },
        async onUpload() {
            const invoiceFile = await this.onDownloadInvoice();
            const reader = new FileReader();
            reader.readAsArrayBuffer(invoiceFile);
            reader.addEventListener('loadend', async () => {
                const wb = new Workbook();
                await wb.xlsx.load(reader.result);
                const importer = new Importer(wb);
                this.invoice = this.onImportInvoice(importer);
            });
        },
    },
};
</script>

<style>
@import '~tachyons/css/tachyons.min.css';

body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
        'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.invoice-app {
    text-align: center;
}

.invoice-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: calc(10px + 2vmin);
    color: white;
}
</style>
