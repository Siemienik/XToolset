import * as chai from 'chai';
import {
    integerMapper
} from '../../../src/mappers';

describe('UNIT TEST: src/mappers/', () => {
    describe('integerMapper', () => {
        const dataProvider = [
            { inValue: '0', expectedResult: 0 },
            { inValue: '000', expectedResult: 0 },
            { inValue: '001', expectedResult: 1 },
            { inValue: '123', expectedResult: 123 },
            { inValue: '123.456', expectedResult: 123 },
            { inValue: '123s', expectedResult: 123 },
            { inValue: '0.1', expectedResult: 0 },
            { inValue: '-1', expectedResult: -1 },
            { inValue: '   -1.2123asd', expectedResult: -1 }
        ];
        dataProvider.forEach(({ inValue, expectedResult }) => {
            it(`numberMapper for input "${inValue}" SHOULD return "${expectedResult}"`, () => {
                chai.expect(integerMapper(inValue as string)).equal(expectedResult);
            });
        });
    });

    describe('integerMapper NaN results', () => {
        const dataProvider = [
            { inValue: '', expectedResult: NaN },
            { inValue: null, expectedResult: NaN },
            { inValue: '  ', expectedResult: NaN },
            { inValue: 'a0.1', expectedResult: NaN },
        ];
        dataProvider.forEach(({ inValue, expectedResult }) => {
            it(`integerMapper for input "${inValue}" SHOULD return "${expectedResult}"`, () => {
                chai.expect(integerMapper(inValue as string)).to.be.NaN;
            });
        });
    });
});
