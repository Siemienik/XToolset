import * as chai from 'chai'

import ImporterFactory from '../src/ImporterFactory' 

describe('reading sigle items (objects)', function () {
    
    const configs = {
        author: {
            type: 'object',
            worksheet: 'contact',
            fields:[
                {row: 2, col:1, key:'firstName'},
                {row: 2, col:2, key:'secondName'},
                {row: 3, col:1, key:'age', mapper:Number.parseInt},
                {row: 4, col:1, key:'city'},
                
            ]
        },
    };

    it('getAllItems should return one correct object', async function () {
        const factory = new ImporterFactory();
        const importer = await  factory.From('tests/data/marsjanie-db.xlsx');
        const result = importer.GetAllItems(configs.author);

        const expected = [
            {firstName:'Marian', secondName:'Marianacki',age:123,city:'Pila-wojenna'}
        ];

        chai.expect(result).eql(expected);
        chai.expect(result.length).equals(1);
    });
});