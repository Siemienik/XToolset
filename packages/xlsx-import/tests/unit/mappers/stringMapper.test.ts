import * as chai from 'chai';
import { isEmpty, isFilled, lowerCaseMapper, upperCaseMapper } from '../../../src/mappers';
import { stringMapper } from '../../../src/mappers/stringMapper';

describe('UNIT TEST: src/mappers/', () => {
    describe('stringMapper', () => {
        const dataProvider = [
            // it is designed for string input only
            { inValue: '', expectedResult: '' },
            { inValue: '0', expectedResult: '0' },
            { inValue: 'a', expectedResult: 'a' },
            { inValue: '0x0', expectedResult: '0x0' },
            { inValue: '[]', expectedResult: '[]' },
            { inValue: '[1,2,3]', expectedResult: '[1,2,3]' },
            { inValue: '{}', expectedResult: '{}' },
            { inValue: '{a:[1,2,3]}', expectedResult: '{a:[1,2,3]}' },

            // invalid input (out of design) - if input is not string should pass same value forward
            { inValue: null, expectedResult: null },
            { inValue: undefined, expectedResult: undefined },
            { inValue: true, expectedResult: true },
            { inValue: false, expectedResult: false },
            { inValue: 0, expectedResult: 0 },
            { inValue: 0x0, expectedResult: 0x0 },
        ];
        dataProvider.forEach(({ inValue, expectedResult }) => {
            it(`stringMapper for input "${inValue}" SHOULD return "${expectedResult}"`, () => {
                chai.expect(stringMapper(inValue as string)).equal(expectedResult);
            });
        });
    });

    // todo move to upperCaseMapper.test.ts
    describe('upperCaseMapper', () => {
        const dataProvider = [
            { inValue: '', expectedResult: '' },
            { inValue: 'asd', expectedResult: 'ASD' },
            { inValue: 'Asd', expectedResult: 'ASD' },
            { inValue: 'ASD', expectedResult: 'ASD' },
            { inValue: 'asd ASD', expectedResult: 'ASD ASD' },
        ];
        dataProvider.forEach(({ inValue, expectedResult }) => {
            it(`upperCaseMapper for input "${inValue}" SHOULD return "${expectedResult}"`, () => {
                chai.expect(upperCaseMapper(inValue)).equal(expectedResult);
            });
        });
    });

    // todo move to lowerCaseMapper.test.ts
    describe('lowerCaseMapper', () => {
        const dataProvider = [
            { inValue: '', expectedResult: '' },
            { inValue: 'asd', expectedResult: 'asd' },
            { inValue: 'Asd', expectedResult: 'asd' },
            { inValue: 'ASD', expectedResult: 'asd' },
            { inValue: 'asd ASD', expectedResult: 'asd asd' },
        ];
        dataProvider.forEach(({ inValue, expectedResult }) => {
            it(`lowerCaseMapper for input "${inValue}" SHOULD return "${expectedResult}"`, () => {
                chai.expect(lowerCaseMapper(inValue)).equal(expectedResult);
            });
        });
    });

    // todo move to isEmpty.test.ts
    describe('isEmpty', () => {
        const dataProvider = [
            { inValue: '', expectedResult: true },
            { inValue: null, expectedResult: true },
            { inValue: ' ', expectedResult: false }, // it is quite problematic case, however it isn't empty
            { inValue: 'null', expectedResult: false },
            { inValue: 'a', expectedResult: false },
            { inValue: 'as d', expectedResult: false },
        ];
        dataProvider.forEach(({ inValue, expectedResult }) => {
            it(`isEmpty for input "${inValue}" SHOULD return "${expectedResult}"`, () => {
                chai.expect(isEmpty(inValue as string)).equal(expectedResult);
            });
        });
    });

    // todo move to isFilled.test.ts
    describe('isFilled', () => {
        const dataProvider = [
            { inValue: '', expectedResult: false },
            { inValue: null, expectedResult: false },
            { inValue: ' ', expectedResult: true }, // it is quite problematic case, however it isn't empty
            { inValue: 'null', expectedResult: true },
            { inValue: 'a', expectedResult: true },
            { inValue: 'as d', expectedResult: true },
        ];
        dataProvider.forEach(({ inValue, expectedResult }) => {
            it(`isFilled for input "${inValue}" SHOULD return "${expectedResult}"`, () => {
                chai.expect(isFilled(inValue as string)).equal(expectedResult);
            });
        });
    });
});
