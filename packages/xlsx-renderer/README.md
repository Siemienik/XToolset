# XLSX-Renderer

[![NPM](https://img.shields.io/npm/l/xlsx-renderer)![npm](https://img.shields.io/npm/v/xlsx-renderer)](https://www.npmjs.com/package/xlsx-renderer) [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/siemienik/xtoolset/xlsx-renderer)](https://github.com/Siemienik/xtoolset/actions) [![codecov](https://codecov.io/gh/Siemienik/xtoolset/branch/master/graph/badge.svg?flag=xlsx-renderer)](https://codecov.io/gh/Siemienik/xtoolset/tree/master/packages/xlsx-renderer)

Export data to Ecma-376 `.XLSX` Excel files based on template,

## Example

```ts
const renderer = new Renderer();
await renderer.renderFromFile('./invoice-template.xlsx', invoiceData)
    .then(wb => wb.xlsx.writeFile('./invoice.xlsx'));
```

Makes generating spreadsheet files as simple as possible - it is enough one line to generate pretty customizable spreadsheet file.

[Read more :arrow_right:](https://siemienik.com/docs/xlsx-renderer)

## Now working with

| **TypeScript** | **JavaScript** | **NodeJS** | **React** | **Angular** | **Vue** |
|---|---|---|---|---|---|
| ![TypeScript](./media/ts-logo-256.png) | ![JavaScript](./media/js-logo-256.png) | ![NodeJS](./media/nodejs-logo-256.png) | ![React](./media/react-logo-256.png) | ![Angular](./media/angular-logo-256.png) | ![Vue](./media/vue-logo-256.png) |

## Useful

* Part of XToolset, see: [Official XToolset documentation on Siemienik.com](https://siemienik.com/docs/xtoolset)
* [:heart: Sponsor me](https://github.com/sponsors/siemienik)
* [Gitter community](https://gitter.im/Siemienik/community)
* Order feature or consulting: consulting@siemienik.com
* License: [MIT](./LICENSE)
