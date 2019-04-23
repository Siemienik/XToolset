import * as chai from 'chai'

import ExcelJsImporterFactory from '../src/ExcelJsImporterFactory' 

const configs = {
    large: {
        name: 'large',
        worksheet: 'Sheet1',
        columns: [
            {index: 1, key: 'id', mapper: (v: string) => Number.parseInt(v)},
            {index: 2, key: 'factor', mapper: (v: string) => Number.parseFloat(v)},
        ],
        rowOffset: 0,
    },
};

describe('read sample file "large"', function () {
    it('large', async function () {
        const importer = new ExcelJsImporterFactory();
        const fileImporter = await  importer.From('tests/data/large-64.xlsx');
        const result = fileImporter.GetAllItems<{id:number, factor:number}>(configs.large);

        chai.expect(result.length).equals(64000);
        chai.expect(result[9].id).equals(10);
        chai.expect(result[9].factor).equals(1.1);
        chai.expect(result[399].id).equals(400);
        chai.expect(result[399].factor).equals(1.0025);
    });
});