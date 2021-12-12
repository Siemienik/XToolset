import * as chai from 'chai';
import { jsonMapper } from '../../../src/mappers/jsonMapper';

describe('UNIT TEST: src/mappers/', () => {
    describe('jsonMapper', () => {
        const dataProvider = [
            { inValue: '', expectedResult: null },
            { inValue: null, expectedResult: null },
            { inValue: ' ', expectedResult: null },
            { inValue: 'asd', expectedResult: null },
            { inValue: 'null', expectedResult: null },
            { inValue: 'false', expectedResult: false },
            { inValue: 'true', expectedResult: true },
            { inValue: '0', expectedResult: 0 },
            { inValue: '1', expectedResult: 1 },
            { inValue: '"string"', expectedResult: 'string' },
            { inValue: "'string'", expectedResult: null },
            { inValue: '{"a":1}', expectedResult: { a: 1 } },
            { inValue: '{"a":[1]}', expectedResult: { a: [1] } },
        ];
        dataProvider.forEach(({ inValue, expectedResult }) => {
            it(`jsonMapper for input "${inValue}" SHOULD return "${JSON.stringify(expectedResult)}"`, () => {
                chai.expect(jsonMapper(inValue as string)).is.eql(expectedResult);
            });
        });

        it('Should return default value on error', () => {
            const mapper = jsonMapper.default({ a: 1 });
            chai.expect(mapper('invalid')).eql({ a: 1 });
        });
    });
});
