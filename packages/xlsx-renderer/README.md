# XLSX-Renderer

[![NPM](https://img.shields.io/npm/l/xlsx-renderer)![npm](https://img.shields.io/npm/v/xlsx-renderer)](https://www.npmjs.com/package/xlsx-renderer) [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/siemienik/xtoolset/xlsx-renderer)](https://github.com/Siemienik/xtoolset/actions) [![codecov](https://codecov.io/gh/Siemienik/xtoolset/branch/master/graph/badge.svg?flag=xlsx-renderer)](https://codecov.io/gh/Siemienik/xtoolset/tree/master/packages/xlsx-renderer)

Export data to Ecma-376 `.XLSX` Excel files based on template,

## Installation

### NPM / Yarn:

```bash
npm install --save xlsx-renderer
# OR:
yarn add xlsx-renderer
```

Then write a code:

```ts
import { Renderer } from "xlsx-renderer";

const renderer = new Renderer();
await renderer.renderFromFile('./invoice-template.xlsx', invoiceData)
    .then(wb => wb.xlsx.writeFile('./invoice.xlsx'));
```

### CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/xlsx-renderer/dist/xlsx-renderer.full.js" />
<script type="application/javascript">
    const { Renderer } = xlsxRenderer;
    const viewModel = {};
    
    const report = fetch("./template.xlsx") // 1. Download a template.
        // 2. Get template as ArrayBuffer.
        .then((response) => response.arrayBuffer())
        // 3. Fill the template with data (generate a report).
        .then((buffer) => new Renderer().renderFromArrayBuffer(buffer, viewModel))
        // Handle errors.
        .catch((err) => console.error("Error while report generation", err));
</script>
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
