import * as chai from 'chai';
import { booleanMapper } from '../../../src/mappers';

describe('UNIT TEST: src/mappers/', () => {
    describe('booleanMapper', () => {
        const dataProvider = [
            { inValue: null, expectedResult: false },
            { inValue: '', expectedResult: false },
            { inValue: '  ', expectedResult: false },
            { inValue: '0', expectedResult: false },
            { inValue: '000', expectedResult: false },
            { inValue: 'true', expectedResult: false },
            { inValue: 'false', expectedResult: false },
            { inValue: 'a0.1', expectedResult: false },

            { inValue: '001', expectedResult: true },
            { inValue: '123', expectedResult: true },
            { inValue: '0.1', expectedResult: true },
            { inValue: '-1', expectedResult: true },
            { inValue: '   -1.2123asd', expectedResult: true },
        ];
        dataProvider.forEach(({ inValue, expectedResult }) => {
            it(`booleanMapper for input "${inValue}" SHOULD return "${expectedResult}"`, () => {
                chai.expect(booleanMapper(inValue as string)).equal(expectedResult);
            });
        });
    });
});
