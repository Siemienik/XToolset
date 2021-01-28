# Svelte

This is an example how to use `xlsx-import` in Svelte.

**LIB Version:** `2.3.4`

## Scripts

`npm start` - compiles and hot-reloads for development

`npm run build` - compiles and minifies for production

`npm run test` - run cypress tests

`npm run validate` - perform some checks against codebase (types, unused css, etc.)

`npm run cy:open` - open cypress dashboard (server must be started before this command)

## Usage

```bash
# install dependencies
npm install

# start dev server
npm run start
```

Open the browser. Then click on "Download and parse invoice" button.
You will see invoice file imported with xlsx-import library.

## What happened

1. [Invoice.xlsx](public/invoice.xlsx) fetched as Blob file
2. Blob file transformed into ArrayBuffer and passed to [exceljs](https://www.npmjs.com/package/exceljs) in order to obtain Workbook class
3. Workbook class then passed to Importer class of xlsx-import for mapping.
   This is [workaround](https://github.com/Siemienik/xlsx-import/issues/4)
   and will be fixed in [#52](https://github.com/Siemienik/xlsx-import/issues/52)
4. After mapping invoice data rendered with [Invoice](src/components/Invoice/Invoice.svelte) component

## What is worth to see here

1. Study config: [`invoiceConfig.ts`](src/components/Invoice/invoiceConfig.ts)
2. Usage package in [`App.svelte (onImportInvoice function)`](src/App.svelte)

## What later

1. Study documentation: [docs](./../../README.md)
2. Start using `xlsx-import` in your project
3. Ask a lot, report bugs and request for help: <https://github.com/Siemienik/xlsx-import/issues>
4. [Sponsor `xlsx-import` project](https://github.com/sponsors/Siemienik)
