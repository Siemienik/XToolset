import * as chai from 'chai';
import { ImportType } from '../../src/config/ImportType';

import { ImporterFactory } from '../../src/ImporterFactory';
import path from "path";

describe('reading sigle items (objects)', () => {
    const configs = {
        author: {
            type: 'object',
            worksheet: 'contact',
            fields: [
                { row: 2, col: 1, key: 'firstName' },
                { row: 2, col: 2, key: 'secondName' },
                { row: 3, col: 1, key: 'age', mapper: Number.parseInt },
                { row: 4, col: 1, key: 'city' },
            ],
        },
    };
    it('getAllItems should return one correct object', async () => {
        const factory = new ImporterFactory();
        const importer = await factory.from('tests/data/marsjanie-db.xlsx');
        const result = importer.getAllItems(configs.author);

        const expected = [{ firstName: 'Marian', secondName: 'Marianacki', age: 123, city: 'Pila-wojenna' }];

        chai.expect(result).eql(expected);
        chai.expect(result.length).equals(1);
    });
    it('getAllItems should return one correct object from buffer', async () => {
        const factory = new ImporterFactory();
        const fs = require('fs')
        const filePath = path.resolve(__dirname, '../data/','marsjanie-db.xlsx')
        const buffer = fs.readFileSync(filePath)
        const importer = await factory.fromBuffer(buffer);
        const result = importer.getAllItems(configs.author)

        const expected = [{ firstName: 'Marian', secondName: 'Marianacki', age: 123, city: 'Pila-wojenna' }];

        chai.expect(result).eql(expected);
        chai.expect(result.length).equals(1);
    });
    const definedTypesAsString = ['object', 'single', 'singleton'];
    definedTypesAsString.forEach(type => {
        it(`for type (as string) '${type}' getAllItems should return one correct object`, async () => {
            const factory = new ImporterFactory();
            const importer = await factory.from('tests/data/marsjanie-db.xlsx');
            const result = importer.getAllItems(configs.author);

            const expected = [{ firstName: 'Marian', secondName: 'Marianacki', age: 123, city: 'Pila-wojenna' }];

            chai.expect(result).eql(expected);
            chai.expect(result.length).equals(1);
        });
    });

    const definedTypesAsEnum = [ImportType.Object, ImportType.Single, ImportType.Singleton];
    definedTypesAsEnum.forEach(type => {
        it(`for type (as enum) '${type}' getAllItems should return one correct object`, async () => {
            const factory = new ImporterFactory();
            const importer = await factory.from('tests/data/marsjanie-db.xlsx');
            const result = importer.getAllItems(configs.author);

            const expected = [{ firstName: 'Marian', secondName: 'Marianacki', age: 123, city: 'Pila-wojenna' }];

            chai.expect(result).eql(expected);
            chai.expect(result.length).equals(1);
        });
    });
});
