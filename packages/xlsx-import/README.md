# XLSX-Import

[![NPM](https://img.shields.io/npm/l/xlsx-import)![npm](https://img.shields.io/npm/v/xlsx-import)](https://www.npmjs.com/package/xlsx-import) [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/siemienik/xtoolset/xlsx-import)](https://github.com/Siemienik/xtoolset/actions) [![codecov](https://codecov.io/gh/Siemienik/xtoolset/branch/master/graph/badge.svg?flag=xlsx-import)](https://codecov.io/gh/Siemienik/xtoolset/tree/master/packages/xlsx-import)

Import data from Workbooks / Worksheets Excel files,

## Example

```ts
const xlsx = await importerFactory.from('./my-awesome-books.xlsx');
const books: Array<Book> = xlsx.getAllItems<Book>(config.books);
```

It allows you to import xlsx spreadsheet file with data into your system with defined TypeScript types.

[Read more :arrow_right:](https://siemienik.com/docs/xlsx-import)


## Now working with:

| **TypeScript** | **JavaScript** | **NodeJS** | **React** | **Angular** | **Vue** |
|---|---|---|---|---|---|
| ![TypeScript](./media/ts-logo-256.png) | ![JavaScript](./media/js-logo-256.png) | ![NodeJS](./media/nodejs-logo-256.png) | ![React](./media/react-logo-256.png) | ![Angular](./media/angular-logo-256.png) | ![Vue](./media/vue-logo-256.png) | 

## Useful:

* Part of XToolset, see: [Official XToolset documentation on Siemienik.com](https://siemienik.com/docs/xtoolset),
* [:heart: Sponsor me](https://github.com/sponsors/siemienik),
* [Gitter community](https://gitter.im/Siemienik/community),
* Order feature or consulting: consulting@siemienik.com,
* License: [MIT](./LICENSE)
