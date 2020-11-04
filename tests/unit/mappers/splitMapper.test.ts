import * as chai from 'chai';
import { isEmpty, lowerCaseMapper, upperCaseMapper } from '../../../src/mappers';
import { splitMapper } from '../../../src/mappers/splitMapper';

describe('UNIT TEST: src/mappers/', () => {
    describe('splitMapper default', () => {
        const dataProvider = [
            // mappers are designed for string input only, like this:
            { inValue: '', expectedResult: [''] },
            { inValue: '0', expectedResult: ['0'] },
            { inValue: ',', expectedResult: ['', ''] },
            { inValue: '0,0', expectedResult: ['0', '0'] },
            { inValue: 'asd,dsa', expectedResult: ['asd', 'dsa'] },
            { inValue: ',asd,dsa', expectedResult: ['', 'asd', 'dsa'] },
            { inValue: ',asd,dsa,', expectedResult: ['', 'asd', 'dsa', ''] },
            { inValue: ',asd;dsa,', expectedResult: ['', 'asd;dsa', ''] },
            { inValue: '[1,2,3]', expectedResult: ['[1', '2', '3]'] },

            // invalid inputs won't to check
            // {inValue: {}, expectedResult: ... },
        ];

        dataProvider.forEach(({ inValue, expectedResult }) => {
            it(`the default splitMapper for input "${inValue}" SHOULD return "${JSON.stringify(
                expectedResult,
            )}"`, () => {
                chai.expect(splitMapper(inValue)).eql(expectedResult);
            });
        });
    });

    describe('splitMapper custom separator', () => {
        const dataProvider = [
            // mappers are designed for string input only, like this:
            { inValue: '', inSeparator: ';', expectedResult: [''] },
            { inValue: '0', inSeparator: ';', expectedResult: ['0'] },
            { inValue: ';', inSeparator: ';', expectedResult: ['', ''] },
            { inValue: '0;0', inSeparator: ';', expectedResult: ['0', '0'] },
            { inValue: 'asd;dsa', inSeparator: ';', expectedResult: ['asd', 'dsa'] },
            { inValue: ';asd;dsa', inSeparator: ';', expectedResult: ['', 'asd', 'dsa'] },
            { inValue: ';asd;dsa;', inSeparator: ';', expectedResult: ['', 'asd', 'dsa', ''] },
            { inValue: ';asd.dsa;', inSeparator: ';', expectedResult: ['', 'asd.dsa', ''] },
            { inValue: ',', inSeparator: ';', expectedResult: [','] },
            { inValue: '0,0', inSeparator: ';', expectedResult: ['0,0'] },
            { inValue: 'asd,dsa', inSeparator: ';', expectedResult: ['asd,dsa'] },
            { inValue: ',asd,dsa', inSeparator: ';', expectedResult: [',asd,dsa'] },
            { inValue: ',asd,dsa,', inSeparator: ';', expectedResult: [',asd,dsa,'] },
            { inValue: ',asd;dsa,', inSeparator: ';', expectedResult: [',asd', 'dsa,'] },
            { inValue: '[1,2,3]', inSeparator: ';', expectedResult: ['[1,2,3]'] },
            {
                inValue: 'Ala ma kota, a kot ma Ale',
                inSeparator: ', a ',
                expectedResult: ['Ala ma kota', 'kot ma Ale'],
            },
            { inValue: 'bbbBBBbbbBBBaaa', inSeparator: 'BBB', expectedResult: ['bbb', 'bbb', 'aaa'] },

            // invalid inputs won't to check
            // {inValue: {}, expectedResult: ... },
        ];
        dataProvider.forEach(({ inValue, inSeparator, expectedResult }) => {
            it(`splitMapper with separator ${inSeparator} for input "${inValue}" SHOULD return "${JSON.stringify(
                expectedResult,
            )}"`, () => {
                const mapper = splitMapper.separator(inSeparator);
                chai.expect(mapper(inValue)).eql(expectedResult);
            });
        });
    });
    describe('splitMapper custom mapper', () => {
        const dataProvider = [
            {
                inValue: 'Ala,ma,kota,,Kot,ma,Ale',
                inMapper: upperCaseMapper,
                expectedResult: ['ALA', 'MA', 'KOTA', '', 'KOT', 'MA', 'ALE'],
            },
            {
                inValue: 'Ala,ma,kota,,Kot,ma,Ale',
                inMapper: lowerCaseMapper,
                expectedResult: ['ala', 'ma', 'kota', '', 'kot', 'ma', 'ale'],
            },
            {
                inValue: 'Ala,ma,kota,,Kot,ma,Ale',
                inMapper: isEmpty,
                expectedResult: [false, false, false, true, false, false, false],
            },
            {
                inValue: 'Ala,ma,kota,,Kot,ma,Ale',
                inMapper: (v: string) => v.length,
                expectedResult: [3, 2, 4, 0, 3, 2, 3],
            },
        ];
        dataProvider.forEach(({ inValue, inMapper, expectedResult }) => {
            it(`splitMapper with separator ${
                inMapper.constructor.name
            } for input "${inValue}" SHOULD return "${JSON.stringify(expectedResult)}"`, () => {
                const mapper = splitMapper.itemMapper<unknown>(inMapper);
                chai.expect(mapper(inValue)).eql(expectedResult);
            });
        });
    });
    describe('splitMapper complex / advanced', () => {
        const getWordInSentencesMapper = () => {
            const sentenceSplitter = splitMapper.separator('. ');
            const wordSplitter = splitMapper.separator(' ');
            return sentenceSplitter.itemMapper(wordSplitter);
        };

        it(`Map sentence into matrix word in sentence`, () => {
            // assumptions
            const input =
                'Lorem ipsum dolor sit amet. consectetur adipiscing elit. Nullam placerat massa nec efficir. ';
            const expectedResult = [
                ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'],
                ['consectetur', 'adipiscing', 'elit'],
                ['Nullam', 'placerat', 'massa', 'nec', 'efficir'],
                [''],
            ];

            // prepare
            const wordsInSentencesMapper = getWordInSentencesMapper();

            // testing
            chai.expect(wordsInSentencesMapper(input)).eql(expectedResult);
        });
    });
});
