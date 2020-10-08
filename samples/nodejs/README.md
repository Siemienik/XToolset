# Hello

This is an example how to use `xlsx-import` in a pure node javascript.

## Usage

```bash
# install
npm install

# execute
node index.js 


# or execute and save into file
node index.js > result.json
```

## What happened?

1. Read spreadsheet file [Invoice.xlsx](invoice.xlsx)
2. Following config import invoice data
3. Map, return and display data _(should be same as [result.json](./result.json))_.

## What is worth to see here?

1. Study importer configs: [`invoiceConfig.js`](configs/invoiceConfig.js)
2. Usage package in [`importer.js`](importer.js)

## What later:

1. Study documentation: [docs](./../../README.md)
2. Start using `xlsx-import` in your project
3. Ask a lot, report bugs and request for help: https://github.com/Siemienik/xlsx-import/issues
4. [Sponsor `xlsx-import` project](https://github.com/sponsors/Siemienik) 


