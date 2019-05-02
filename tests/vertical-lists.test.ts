import * as chai from 'chai'

import ImporterFactory from '../src/ImporterFactory' 

describe('testing vertical list - on file "marsjanie-db"', function () {
    
    const configs = {
        people: {
            worksheet: 'szit1',
            columns: [
                {index: 1, key: 'id', mapper: (v: string) => Number.parseInt(v)},
                {index: 2, key: 'firstName',},
                {index: 3, key: 'secondName',},
                {index: 4, key: 'height', mapper: (v: string) => Number.parseInt(v)},
                {index: 5, key: 'description',},
                {index: 6, key: 'isActive', mapper: (v: string) => v === "1"},
                {index: 7, key: 'groupName',},
            ],
            rowOffset: 6,
        },
        groups: {
            worksheet: 'grupy',
            columns: [
                {index: 1, key: 'name',},
                {index: 2, key: 'param', mapper: (v: string) => Number.parseFloat(v)},
            ],
            rowOffset: 1,
        },
    };

    it('worksheet "szit1"', async function () {
        const factory = new ImporterFactory();
        const importer = await  factory.From('tests/data/marsjanie-db.xlsx');
        const result = importer.GetAllItems(configs.people);

        const expected = [
            {
                id: 1,
                firstName: 'Pierwszy',
                secondName: 'Nazwiskowski',
                height: 123,
                description: 'Gbur',
                isActive: true,
                groupName: 'Taka se',
            },
            {
                id: 2,
                firstName: 'Drugi',
                secondName: 'Secendowsky',
                height: 213,
                description: 'Mór',
                isActive: true,
                groupName: 'Inna grupa',
            },
            {
                id: 3,
                firstName: 'Thrzeci',
                secondName: 'Pomsyłoless',
                height: 321,
                description: 'Chór',
                isActive: false,
                groupName: 'Taka se',
            },
            {
                id: 4,
                firstName: 'Charty',
                secondName: 'Chartowski',
                height: 421,
                description: 'Ciąg',
                isActive: true,
                groupName: 'Inna grupa',
            },
        ];

        chai.expect(result).eql(expected);
    });
    it('worksheet "grupy"', async function () {
        const factory = new ImporterFactory();
        const importer = await  factory.From('tests/data/marsjanie-db.xlsx');
        const result = importer.GetAllItems(configs.groups);

        const expected = [
            {
                "name": "Taka se",
                "param": 12,
            },
            {
                "name": "Inna grupa",
                "param": 21,
            },
        ];

        chai.expect(result).eql(expected);
    });
});