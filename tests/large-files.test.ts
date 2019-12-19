import * as chai from 'chai'

import ImporterFactory from '../src/ImporterFactory' 

const configs = {
    large: {
        worksheet: 'Sheet1',
        columns: [
            {index: 1, key: 'id', mapper: (v: string) => Number.parseInt(v)},
            {index: 2, key: 'factor', mapper: (v: string) => Number.parseFloat(v)},
        ],
        rowOffset: 0,
    },
};

describe('64k rows', function () {
    it('getAllItems return 64k correct items', async function () {
        const factory = new ImporterFactory();
        const importer = await  factory.From('tests/data/large-64.xlsx');
        const result = importer.GetAllItems<{id:number, factor:number}>(configs.large);

        chai.expect(result.length).equals(64000);
        chai.expect(result[9].id).equals(10);
        chai.expect(result[9].factor).equals(1.1);
        chai.expect(result[399].id).equals(400);
        chai.expect(result[399].factor).equals(1.0025);
    }).timeout(15000);
});