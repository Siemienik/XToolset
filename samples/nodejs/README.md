# Hello

This is an example how to use `xlsx-import` in a pure node javascript.

**LIB Version:** `2.3.3`

## Scripts

`npm run start` - run script

`npm run test` - run script and check output to match snapshot

`npm run snapshot` - run script and save output into snapshot file

## Usage

```shell script
# install
npm install

# execute
node index.js

# run test
npm test

# make new test snapshot (stay careful)
npm run snapshot

# or execute and save into file
node index.js > result.json
```

## What happened

1. Read spreadsheet file [Invoice.xlsx](invoice.xlsx)
2. Following config import invoice data
3. Map, return and display data _(should be same as [result.json](./result.json))_.

## What is worth to see here

1. Study importer configs: [`invoiceConfig.js`](configs/invoiceConfig.js)
2. Usage package in [`importer.js`](importer.js)

## What later

1. Study documentation: [docs](./../../README.md)
2. Start using `xlsx-import` in your project
3. Ask a lot, report bugs and request for help: <https://github.com/Siemienik/xlsx-import/issues>
4. [Sponsor `xlsx-import` project](https://github.com/sponsors/Siemienik)
