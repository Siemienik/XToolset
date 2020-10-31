# React

This is an example how to use `xlsx-import` in React.
It is made with [CRA](https://github.com/facebook/create-react-app)

**LIB Version:** `2.3.3`

## Scripts

`npm start` - start dev server

`npm run build` - build static artifacts

`npm run test` - run all tests

`npm run test:cra` - run jest only tests

`npm run test:cy` - run cypress only tests

`npm run cy:open` - open cypress dashboard (server must be started before this command)

`npm run eject` - eject CRA

## Usage

```bash
# install dependencies
npm install

# start dev server
npm start
```

Browser will be opened automatically. Then click on "Download and parse invoice" button.
You will see invoice file imported with xlsx-import library.

## What happened

1. [Invoice.xlsx](public/invoice.xlsx) fetched as Blob file
2. Blob file transformed into ArrayBuffer and passed to [exceljs](https://www.npmjs.com/package/exceljs) in order to obtain Workbook class
3. Workbook class then passed to Importer class of xlsx-import for mapping.
This is [workaround](https://github.com/Siemienik/xlsx-import/issues/4)
and will be fixed in [#52](https://github.com/Siemienik/xlsx-import/issues/52)
4. After mapping invoice data rendered with [Invoice](src/components/Invoice/Invoice.jsx) component

## What is worth to see here

1. Study config: [`invoiceConfig.js`](src/components/Invoice/invoiceConfig.js)
2. Usage package in [`App.js (importInvoice function)`](src/App.js)

## What later

1. Study documentation: [docs](./../../README.md)
2. Start using `xlsx-import` in your project
3. Ask a lot, report bugs and request for help: <https://github.com/Siemienik/xlsx-import/issues>
4. [Sponsor `xlsx-import` project](https://github.com/sponsors/Siemienik)
