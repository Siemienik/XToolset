import * as chai from 'chai';
import {
    isValueMapper,
} from '../../../src/mappers';

describe('UNIT TEST: src/mappers/', () => {
    describe('isValueMapper without accepted values', () => {
        const dataProvider = [
            { inValue: '', inAcceptedValue: [], expectedResult: false },
            { inValue: 'TRUE', inAcceptedValue: [], expectedResult: false },
            { inValue: 'X', inAcceptedValue: [], expectedResult: false },
            { inValue: '1', inAcceptedValue: [], expectedResult: false },
            { inValue: 'FALSE', inAcceptedValue: [], expectedResult: false },
            { inValue: 'Lorem', inAcceptedValue: [], expectedResult: false },
        ];
        dataProvider.forEach(({ inValue, inAcceptedValue, expectedResult }) => {
            it(`isValueMapper with "${inAcceptedValue}" accepted values for input "${inValue}" SHOULD return "${expectedResult}"`, () => {
                chai.expect(isValueMapper(inAcceptedValue)(inValue as string)).equal(expectedResult);
            });
        });
    });

    describe('isValueMapper with one accepted value', () => {
        const dataProvider = [
            { inValue: '', inAcceptedValue: ['X'], expectedResult: false },
            { inValue: 'TRUE', inAcceptedValue: ['X'], expectedResult: false },
            { inValue: 'X', inAcceptedValue: ['X'], expectedResult: true },
            { inValue: '1', inAcceptedValue: ['X'], expectedResult: false },
            { inValue: 'FALSE', inAcceptedValue: ['X'], expectedResult: false },
            { inValue: 'Lorem', inAcceptedValue: ['X'], expectedResult: false },
        ];
        dataProvider.forEach(({ inValue, inAcceptedValue, expectedResult }) => {
            it(`isValueMapper with "${inAcceptedValue}" accepted values for input "${inValue}" SHOULD return "${expectedResult}"`, () => {
                chai.expect(isValueMapper(inAcceptedValue)(inValue as string)).equal(expectedResult);
            });
        });
    });

    describe('isValueMapper with more than one accepted value', () => {
        const dataProvider = [
            { inValue: '', inAcceptedValue: ['X', 'TRUE', '1'], expectedResult: false },
            { inValue: 'TRUE', inAcceptedValue: ['X', 'TRUE', '1'], expectedResult: true },
            { inValue: 'X', inAcceptedValue: ['X', 'TRUE', '1'], expectedResult: true },
            { inValue: '1', inAcceptedValue: ['X', 'TRUE', '1'], expectedResult: true },
            { inValue: 'FALSE', inAcceptedValue: ['X', 'TRUE', '1'], expectedResult: false },
            { inValue: 'Lorem', inAcceptedValue: ['X', 'TRUE', '1'], expectedResult: false },
        ];
        dataProvider.forEach(({ inValue, inAcceptedValue, expectedResult }) => {
            it(`isValueMapper with "${inAcceptedValue}" accepted values for input "${inValue}" SHOULD return "${expectedResult}"`, () => {
                chai.expect(isValueMapper(inAcceptedValue)(inValue as string)).equal(expectedResult);
            });
        });
    });
    
    describe('isValueMapper with different case', () => {
        const dataProvider = [
            { inValue: 'TRUE', inAcceptedValue: ['true'], expectedResult: true },
            { inValue: 'X', inAcceptedValue: ['x'], expectedResult: true },
        ];
        dataProvider.forEach(({ inValue, inAcceptedValue, expectedResult }) => {
            it(`isValueMapper with "${inAcceptedValue}" accepted values for input "${inValue}" SHOULD return "${expectedResult}"`, () => {
                chai.expect(isValueMapper(inAcceptedValue)(inValue as string)).equal(expectedResult);
            });
        });
    });
});
