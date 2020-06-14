# Importing data from xlsx as simple as possible

 [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/siemienik/xlsx-import/lint-build-test)](https://github.com/Siemienik/xlsx-import/actions)[![codecov](https://codecov.io/gh/Siemienik/xlsx-import/branch/master/graph/badge.svg)](https://codecov.io/gh/Siemienik/xlsx-import)

 [![NPM](https://img.shields.io/npm/l/xlsx-import)![npm](https://img.shields.io/npm/v/xlsx-import)](https://www.npmjs.com/package/xlsx-import)

 ![GitHub top language](https://img.shields.io/github/languages/top/siemienik/xlsx-import)![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/siemienik/xlsx-import)


# Getting Started:

1. install package

```
npm i xlsx-import --save
```

2. write config
```javascript
    const config = {
        books: {
            type: 'list',
            worksheet: 'Favourites',
            columns: [
                {
                    index: 1, // row index (1,2,3....n)
                    key: 'Id', // output item's field
                    mapper: (v: string) => Number.parseInt(v) // nullable, for transformating values
                },
                {index: 2, key: 'Title'},
                {index: 5, key: 'Author'},
            ],
            rowOffset: 1, //offset header row
        },
        owner: {
            worksheet: 'About list owner',
            type: 'object',
            fields:[
                {row: 2, col:1, key:'FirstName'},
                {row: 2, col:2, key:'SecondName'},
                {row: 3, col:1, key:'Age', mapper:Number.parseInt},
            ]
        },
    };
```

3. Types:
```typescipt
interface Book {
    Id: number;
    Title: string;
    Author: string;
}

interface Person {
    FirstName: string;
    SecondName: string;
    Age: number;
}
```

4. Import:
```typescipt
    const factory = new ImporterFactory();

    //...

    const importer = await  factory.From(filePath);
    const books = importer.GetAllItems<Book>(config.books); //it returns `Book[]`
    const author = importer.GetAllItems<Person>(config.owner);

```

# See also:

* [xlsx-renderer](https://github.com/Siemienik/xlsx-rendererb)
* [LICENSE](LICENSE)
