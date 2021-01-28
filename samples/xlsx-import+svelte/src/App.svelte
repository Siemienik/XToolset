<script lang="ts">
    import { Workbook } from 'exceljs';
    import { Importer } from 'xlsx-import/lib/Importer';
    import XlsxImportLogo from './components/XlsxImportLogo/Logo.svelte';
    import { Invoice, getInvoiceConfig } from './components/Invoice';
    import type { Item, Buyer, Seller, Dates } from './components/Invoice';
    import 'tachyons/css/tachyons.min.css';

    let invoice = null;
    function onImportInvoice(importer: Importer) {
        const config = getInvoiceConfig();

        const { date, dueDate } = importer.getAllItems<Dates>(config.misc)[0];
        const seller = importer.getAllItems<Seller>(config.seller)[0];
        const buyer = importer.getAllItems<Buyer>(config.buyer)[0];
        const items = importer.getAllItems<Item>(config.items);

        const total = items.reduce((p, c) => p + c.price, 0);
        return {
            buyer,
            date,
            dueDate,
            items,
            seller,
            total,
        };
    }

    async function onDownloadInvoice() {
        return fetch('/invoice.xlsx').then((r) => r.blob());
    }

    async function onUpload() {
        const invoiceFile = await onDownloadInvoice();
        const reader = new FileReader();
        reader.readAsArrayBuffer(invoiceFile);
        reader.addEventListener('loadend', async () => {
            if (reader.result instanceof ArrayBuffer) {
                const wb = new Workbook();
                await wb.xlsx.load(reader.result);
                const importer = new Importer(wb);
                invoice = onImportInvoice(importer);
            }
        });
    }
</script>

<main>
    <div class="app">
        <XlsxImportLogo />
        <main class="app-header pt6 pb4">
            <h1>
                <a
                    class="link underline dim white"
                    href="https://github.com/Siemienik/XToolSet/tree/master/samples/xlsx-import%2Bsvelte"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Svelte sample
                </a>
            </h1>
            <p>Click button bellow and see xlsx-import in action</p>
            <button class="f6" type="button" on:click={onUpload} disabled={Boolean(invoice)}>
                Download and parse invoice
            </button>
            {#if invoice}
                <Invoice {invoice} />
            {/if}
        </main>
    </div>
</main>

<style>
    .app {
        text-align: center;
    }

    .app-header {
        background-color: #282c34;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: calc(10px + 2vmin);
        color: white;
    }
</style>
