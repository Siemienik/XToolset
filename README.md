# XLSX-Import

## Importing data from xlsx as simple as possible

 [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/siemienik/xlsx-import/lint-build-test)](https://github.com/Siemienik/xlsx-import/actions)[![codecov](https://codecov.io/gh/Siemienik/xlsx-import/branch/master/graph/badge.svg)](https://codecov.io/gh/Siemienik/xlsx-import)

 [![NPM](https://img.shields.io/npm/l/xlsx-import)![npm](https://img.shields.io/npm/v/xlsx-import)](https://www.npmjs.com/package/xlsx-import)

 ![GitHub top language](https://img.shields.io/github/languages/top/siemienik/xlsx-import)![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/siemienik/xlsx-import)

## Getting Started

### 1. Install the package

```shell script
npm i xlsx-import --save
```

### 2. Write a config

```ts
    const config = {
        books: {
            type: 'list',
            worksheet: 'Favourites',
            columns: [
                {
                    index: 1, // column index (1,2,3....n); `1` for column `A`
                    key: 'Id', // output item's field
                    mapper: (v: string) => Number.parseInt(v) // nullable, for transformating values
                },
                {index: 2, key: 'Title'}, // column `B`
                {index: 5, key: 'Author'}, // column `E`
            ],
            rowOffset: 1, // offset header row
        },
        owner: {
            worksheet: 'About list owner',
            type: 'object',
            fields: [
                {row: 2, col: 1, key: 'FirstName'}, // `A2`
                {row: 2, col: 2, key: 'SecondName'}, // `B2`
                {row: 3, col: 1, key: 'Age', mapper: Number.parseInt}, // `A3`
            ]
        },
    };
```

### 3. Use mappers (optional)

Mapper is a function that transforms values. You can use [built-in mappers](#Mappers) or write your own

```ts
    import { upperCaseMapper, isEmpty, isFilled } from 'xlsx-import/lib/mappers';

    const config = {
        // ...
        owner: {
            worksheet: 'About list owner',
            type: 'object',
            fields:[
                {row: 2, col: 1, key: 'FirstName'},
                {row: 2, col: 2, key: 'SecondName', mapper: upperCaseMapper},
                {row: 3, col: 1, key: 'Age', mapper: Number.parseInt},
                // three fields based on one cell but with different mapper
                {row: 2, col: 3, key: 'EmployedIn'},
                {row: 2, col: 3, key: 'IsUnemployed', mapper: isEmpty},
                {row: 2, col: 3, key: 'IsEmployed', mapper: isFilled},
            ]
        },
    };
```

### 4. Types

```ts
interface Book {
    Id: number;
    Title: string;
    Author: string;
}

interface Person {
    FirstName: string;
    SecondName: string;
    Age: number;

    EmployedIn: string;
    IsUnemployed: boolean;
    IsEmployed: boolean;
}
```

### 5. Import data

```ts
    const factory = new ImporterFactory();

    //...

    const importer = await factory.from(filePath);
    const books = importer.getAllItems<Book>(config.books); // it returns `Book[]`
    const author = importer.getAllItems<Person>(config.owner);

```

## Samples

Sample integration with `xlsx-import` are placed in [./samples](./samples) directory. Currently available:

* [NodeJS sample](./samples/nodejs/) of **importing an invoice** - it is pure JS example which runs on nodejs.
* [NodeJS + TS sample](./samples/nodejs-ts/) of **importing an invoice** - it is Typescript example that can be transpiled down to pure JS or run directly with ts-node.
* [ExpressJS sample](./samples/express/) - it is a small service created with ExpressJS can parse xlsx files with concrete structure

## The configuration

### `worksheet`

It is a string, indicates which worksheet should be used for data source.

#### `types`

| Enum `ImportType` | Raw values | Description
|-----|------------|-----------
| **Default:** <br/>`List`, aliases: `ListVertical`,  `Vertical`  | `list`, `list-vertical`, `vertical` | Used to import list of objects from worksheet reading from top to down (row by row). Each field has to defined column index (`A` is `1`, `B` is `2` ... etc.).
| `Object`, aliases: `Single`,  `Singleton`  | `object`, `single`, `singletion` | Used to import single object from worksheet. Each field has to has defined row&col index.

***What in case of performing incorrect `type` parameter value?***

Here is a implementation of fallback mechanism to attempting to parse data as ListVertical, which is the common type used in this library.<br/> *In that case `console.warn` will be written.*

#### `fields` or `columns`

This is `type` related configuration, for more information please study examples above, there are a full configuration used.

#### Mappers

| Exported Name | Description
|-----|-----------
|upperCaseMapper|Transforms string to upper case
|lowerCaseMapper|Transforms string to lower case
|jsonMapper|Transforms a json string to a TJsonResponse or to null if parsing was not possible
|integerMapper|Transforms string into integer
|booleanMapper|Transforms string into boolean
|numberMapper|Transforms string into number
|isEmpty|Examines if input is empty
|isFilled|Examines if input is not empty
|splitMapper|Transforms string into array of items

##### `splitMapper`

Configurable and immutable **splitMapper** with possibility to use specific `itemMapper<TReturnType>(mapper)` or `separator(string)`.

* `.separator(';'): SplitMapper` - set separator
* `.itemMapper(itemMapper): SplitMapper` - set mapper for items,

Setting separator or item mapper do not change origin mapper but create new one. As a item mapper may use also another `splitMapper` like below:

```ts
// Building a mapper
const sentenceSplitter = splitMapper.separator('. ');
const wordSplitter = splitMapper.separator(' ');
const wordsInSentencesMapper = sentenceSplitter.itemMapper<string[]>(wordSplitter);

// Standalone usage:
const input = 'Lorem ipsum dolor sit amet. consectetur adipiscing elit. Nullam placerat massa nec efficir. ';

const result = wordsInSentencesMapper(input);
// [
//     ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'],
//     ['consectetur', 'adipiscing', 'elit'],
//     ['Nullam', 'placerat', 'massa', 'nec', 'efficir'],
//     ['']
// ]


// In a config:
// {row: 3, col: 1, key: 'words', mapper: wordsInSentencesMapper},

```

## Supported Node version

8 | 9 | 10 | 11 | 12 | 13 | 14
--|---|----|----|----|----|---
❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅

Node v8 and v9 compatibly was drop after upgrade `ExcelJS` to version 4+ and it is able to turn on by downgrading `xlsx-import` to version 2.2.1 or if needed really important by requesting me directly.

## Supported browsers

Chrome, Firefox. [_proved here_](https://github.com/Siemienik/xlsx-import/pull/57)

## See also

* [![npm](https://img.shields.io/npm/v/xlsx-renderer)](https://www.npmjs.com/package/xlsx-renderer) [XLSX-renderer](https://github.com/Siemienik/xlsx-renderer) - makes generating excel files as simple as possible - it is enough one line to generate pretty customizable spreadsheet file.
* [ts-package-structure](https://github.com/Siemienik/ts-package-structure) - the robust structure which I use to creating packages.
* [MIT LICENSE](LICENSE)
