# Hello

This is an example how to use `xlsx-import-cli (sxi)` .

**LIB Version:** `0.0.1-alpha1`

## Scripts

* `npm run example:seller` same as `node_modules/.bin/sxi configs/seller.js invoice.xlsx` - imports seller data from invoice.xlsx.
* `npm run example:buyer` same as `node_modules/.bin/sxi configs/buyer.js invoice.xlsx` - imports buyer data from invoice.xlsx.
* `npm run example:items` same as `node_modules/.bin/sxi configs/items.js invoice.xlsx` - imports items data from invoice.xlsx.
* `npm run example:misc` same as `node_modules/.bin/sxi configs/misc.js invoice.xlsx` - imports misc data from invoice.xlsx.

* `npm run example:all`  runs all above at once.

## What happened

1. Read spreadsheet file [Invoice.xlsx](invoice.xlsx)
2. Following config import requested data
3. Map and return data.

## What is worth to see here

1. Study importer configs: [`./configs/*.js`](configs/)
2. Scripts section in [`package.json`](./package.json)

## What later

1. Study documentation: [docs](./../../README.md)
2. Start using **XToolset** in your project
3. Ask a lot, report bugs and request for help: <https://github.com/Siemienik/xtoolset/issues>
4. [Sponsor `xtoolset` project](https://github.com/sponsors/Siemienik)
