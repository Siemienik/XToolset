import * as chai from 'chai';
import { IMPORT_TYPE_DEFAULT, ImportType } from '../../src/config/ImportType';

import { ImporterFactory } from '../../src/ImporterFactory';

describe('testing vertical list - on file "marsjanie-db"', () => {
    const configs = {
        people: {
            worksheet: 'szit1',
            columns: [
                { index: 1, key: 'id', mapper: (v: string) => Number.parseInt(v) },
                { index: 2, key: 'firstName' },
                { index: 3, key: 'secondName' },
                { index: 4, key: 'height', mapper: (v: string) => Number.parseInt(v) },
                { index: 5, key: 'description' },
                { index: 6, key: 'isActive', mapper: (v: string) => v === '1' },
                { index: 7, key: 'groupName' },
            ],
            rowOffset: 6,
        },
        groups: {
            worksheet: 'grupy',
            columns: [
                { index: 1, key: 'name' },
                { index: 2, key: 'param', mapper: (v: string) => Number.parseFloat(v) },
            ],
            rowOffset: 1,
        },
    };

    it('worksheet "szit1"', async () => {
        const factory = new ImporterFactory();
        const importer = await factory.from('tests/data/marsjanie-db.xlsx');
        const result = importer.getAllItems(configs.people);

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

    it('worksheet "grupy"', async () => {
        const factory = new ImporterFactory();
        const importer = await factory.from('tests/data/marsjanie-db.xlsx');
        const result = importer.getAllItems(configs.groups);

        const expected = [
            {
                name: 'Taka se',
                param: 12,
            },
            {
                name: 'Inna grupa',
                param: 21,
            },
        ];

        chai.expect(result).eql(expected);
    });

    const definedTypesAsString = ['list', 'list-vertical', 'vertical']; // not recommended
    definedTypesAsString.forEach(type => {
        it(`with defined type as string '${type}'`, async () => {
            const factory = new ImporterFactory();
            const importer = await factory.from('tests/data/marsjanie-db.xlsx');
            const result = importer.getAllItems({ ...configs.groups, type });

            const expected = [
                {
                    name: 'Taka se',
                    param: 12,
                },
                {
                    name: 'Inna grupa',
                    param: 21,
                },
            ];

            chai.expect(result).eql(expected);
        });
    });

    const definedTypesAsEnum = [ImportType.List, ImportType.Vertical, ImportType.ListVertical, IMPORT_TYPE_DEFAULT];
    definedTypesAsEnum.forEach(type => {
        it(`with defined type as enum '${type}'`, async () => {
            const factory = new ImporterFactory();
            const importer = await factory.from('tests/data/marsjanie-db.xlsx');
            const result = importer.getAllItems({ ...configs.groups, type });

            const expected = [
                {
                    name: 'Taka se',
                    param: 12,
                },
                {
                    name: 'Inna grupa',
                    param: 21,
                },
            ];

            chai.expect(result).eql(expected);
        });
    });

    it(`with defined invalid type`, async () => {
        let didWarn = false;

        // tslint:disable-next-line:no-console
        const warnOriginal = console.warn;
        // tslint:disable-next-line:no-console
        console.warn = () => (didWarn = true);

        const factory = new ImporterFactory();
        const importer = await factory.from('tests/data/marsjanie-db.xlsx');
        const result = importer.getAllItems({ ...configs.groups, type: 'invalid-ktobywnocykodzil?' });

        const expected = [
            {
                name: 'Taka se',
                param: 12,
            },
            {
                name: 'Inna grupa',
                param: 21,
            },
        ];

        chai.expect(didWarn).equal(true, 'Warn should be pushed.');
        chai.expect(result).eql(expected);

        // tslint:disable-next-line:no-console
        console.warn = warnOriginal;
    });

    it(`should return first item of sheet's values array`, async () => {
        const factory = new ImporterFactory();
        const importer = await factory.from('tests/data/marsjanie-db.xlsx');
        const result = importer.getFirstItem(configs.groups);

        const expected = {
            name: 'Taka se',
            param: 12,
        };

        chai.expect(result).eql(expected);
    });
});
