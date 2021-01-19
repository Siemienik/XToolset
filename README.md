<center>

![XToolSet Banner](./media/xtoolset-logo-final.svg)

Fancy TypeScript / JavaScript spreadsheet package for browsers and node: `xlsx-import`, `xlsx-renderer`, and command line tools

***Helps handle spreadsheet files `xlsx` in smart way by using high level api.***

</center>

## Packages

### The `xlsx-import`

[![NPM](https://img.shields.io/npm/l/xlsx-import)![npm](https://img.shields.io/npm/v/xlsx-import)](https://www.npmjs.com/package/xlsx-import) [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/siemienik/xtoolset/xlsx-import)](https://github.com/Siemienik/xtoolset/actions) [![codecov](https://codecov.io/gh/Siemienik/xtoolset/branch/master/graph/badge.svg?flag=xlsx-import)](https://codecov.io/gh/Siemienik/xtoolset/tree/master/packages/xlsx-import)

It allows you to import xlsx spreadsheet file with data into your system with defined TypeScript types.

```ts
const xlsx = await importerFactory.from('./my-awesome-books.xlsx');
const books: Array<Book> = xlsx.getAllItems<Book>(config.books);
```

[Read more :arrow_right:](packages/xlsx-import)

### The `xlsx-renderer`

[![NPM](https://img.shields.io/npm/l/xlsx-renderer)![npm](https://img.shields.io/npm/v/xlsx-renderer)](https://www.npmjs.com/package/xlsx-renderer) [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/siemienik/xtoolset/xlsx-renderer)](https://github.com/Siemienik/xtoolset/actions) [![codecov](https://codecov.io/gh/Siemienik/xtoolset/branch/master/graph/badge.svg?flag=xlsx-renderer)](https://codecov.io/gh/Siemienik/xtoolset/tree/master/packages/xlsx-renderer)

Makes generating spreadsheet files as simple as possible - it is enough one line to generate pretty customizable spreadsheet file.

```ts
const renderer = new Renderer();
await renderer.renderFromFile('./invoice-template.xlsx', invoiceData)
    .then(wb => wb.xlsx.writeFile('./invoice.xlsx'));
```

[Read more :arrow_right:](packages/xlsx-renderer)

## Command Line Tools

### The `xlsx-import-cli` (`sxi`)

[![NPM](https://img.shields.io/npm/l/sxi)![npm](https://img.shields.io/npm/v/sxi)](https://www.npmjs.com/package/sxr) [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/siemienik/xtoolset/xlsx-import-cli)](https://github.com/Siemienik/xtoolset/actions)

Imports data from spreadsheet file using command line.

```shell script
sxi books.cfg.js my-awesome-books.xlsx > books-list.json
```

[Read more :arrow_right:](packages/xlsx-import-cli)

### The `xlsx-renderer-cli` (`sxr`)

[![NPM](https://img.shields.io/npm/l/sxr)![npm](https://img.shields.io/npm/v/sxr)](https://www.npmjs.com/package/sxr) [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/siemienik/xtoolset/xlsx-renderer-cli)](https://github.com/Siemienik/xtoolset/actions)

Generate spreadsheets files following by the `template` with `view model` from command line.

```shell script
sxr --model invoice-data.json invoice-template.xlsx > invoice.xlsx
```

[Read more :arrow_right:](packages/xlsx-renderer-cli)

### Examples

Examples are available in a flat structure, and they are named by using : `[package_name]+[technology]` - for instance `xlsx-import+nodejs+ts`.

[See `samples/`](./samples)

Additionally, the `xlsx-renderer` has lots of examples used for the integration testing.
[Read more](https://github.com/Siemienik/XToolSet/tree/master/packages/xlsx-renderer#examples).

## Support

If any help needed, just feel free to create an issue. We will be really thankful for added links into stackoverflow topics if exists.

We are ready to provide paid support, in order that please contact me: [hi@siemienik.pl](mailto://hi@siemienik.pl) or [support@siemienik.pl](mailto://support@siemienik.pl).

## MIT licensed

All of these tools and packages are **free to use for commercial and non-commercial usages**, see the [MIT License](LICENSE).
