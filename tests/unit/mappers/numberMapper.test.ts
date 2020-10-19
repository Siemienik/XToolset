import * as chai from 'chai';
import {
    numberMapper
} from '../../../src/mappers';

describe('UNIT TEST: src/mappers/', () => {
    describe('numberMapper', () => {
        const dataProvider = [
            { inValue: '0', expectedResult: 0 },
            { inValue: '000', expectedResult: 0 },
            { inValue: '001', expectedResult: 1 },
            { inValue: '123', expectedResult: 123 },
            { inValue: '123s', expectedResult: 123 },
            { inValue: '0.1', expectedResult: 0.1 },
            { inValue: '-1', expectedResult: -1 },
            { inValue: '   -1.2123asd', expectedResult: -1.2123 }
        ];
        dataProvider.forEach(({ inValue, expectedResult }) => {
            it(`numberMapper for input "${inValue}" SHOULD return "${expectedResult}"`, () => {
                chai.expect(numberMapper(inValue as string)).equal(expectedResult);
            });
        });
    });

    describe('numberMapper NaN results', () => {
        const dataProvider = [
            { inValue: '', expectedResult: NaN },
            { inValue: null, expectedResult: NaN },
            { inValue: '  ', expectedResult: NaN },
            { inValue: 'a0.1', expectedResult: NaN },
        ];
        dataProvider.forEach(({ inValue, expectedResult }) => {
            it(`numberMapper for input "${inValue}" SHOULD return "${expectedResult}"`, () => {
                chai.expect(numberMapper(inValue as string)).to.be.NaN;
            });
        });
    });
});
