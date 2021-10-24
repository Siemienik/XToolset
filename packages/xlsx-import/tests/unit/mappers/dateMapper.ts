import * as chai from 'chai';
import { dateMapper } from '../../../src/mappers';

describe('UNIT TEST: src/mappers/', () => {
    describe('dateMapper', () => {
        const dataProvider = [
            // data time
            {
                inValue: 'Thu Oct 08 2020 02:00:00 GMT+0200 (Central European Summer Time)',
                expectedResult: 1602115200000,
            },
            { inValue: 'Thu Jan 30 1750 02:00:00 GMT-0900', expectedResult: -6939954000000 },
            { inValue: 'Thu Jan 30 3125', expectedResult: 36450774000000 },

            // invalid input (out of design) - if input is not string should pass same value forward
            { inValue: 'asd', expectedResult: NaN },
            { inValue: null, expectedResult: NaN },
            { inValue: undefined, expectedResult: NaN },
            { inValue: true, expectedResult: NaN },
            { inValue: false, expectedResult: NaN },
            { inValue: 0, expectedResult: NaN },
            { inValue: 0x0, expectedResult: NaN },
        ];
        dataProvider.forEach(({ inValue, expectedResult }) => {
            it(`dateMapper for input "${inValue}" SHOULD return "${expectedResult}"`, () => {
                chai.expect(dateMapper(inValue as string).getTime()).eql(expectedResult);
            });
        });
    });
});
