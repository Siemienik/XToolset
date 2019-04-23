# Importing data from xlsx as simple as possible
 
# Getting Started:

1. install package

```
npm i xlsx-import --save
```

2. write config
```javascript
    const configs = {
        books: {
            name: 'books',
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
    };
```

3. Type:
```typescipt
interface Book {
    Id: number;
    Title: string;
    Author: string;
}
```

4. Import:
```typescipt
    const importer = new ExcelJsImporterFactory();
    
    const fileImporter = await  importer.From(filePath);
    const books = fileImporter.GetAllItems<Book>(); //it returns `Book[]`
```

# Regards

[LICENSE](LICENSE)