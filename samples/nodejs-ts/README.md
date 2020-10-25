# NodeJS + Typescript

This is an example how to use `xlsx-import` in node + typescript.

**LIB Version:** `2.3.1`

## Usage

```shell script
# install dependencies
npm install

# execute
npm start

# or execute and save into file
./node_modules/.bin/ts-node src/index.ts > result.json
```

## What happened

1. Read spreadsheet file [Invoice.xlsx](invoice.xlsx)
2. Following config import invoice data
3. Map, return and display data _(should be same as [result.json](result.json))_.

## What is worth to see here

1. Study config and interfaces: [`invoiceConfig.ts`](src/configs/invoiceConfig.ts)
2. Usage package in [`importer.ts`](src/importer.ts)

## What later

1. Study documentation: [docs](./../../README.md)
2. Start using `xlsx-import` in your project
3. Ask a lot, report bugs and request for help: <https://github.com/Siemienik/xlsx-import/issues>
4. [Sponsor `xlsx-import` project](https://github.com/sponsors/Siemienik)
