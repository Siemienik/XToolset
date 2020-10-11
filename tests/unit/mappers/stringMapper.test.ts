import * as chai from 'chai';
import { upperCaseMapper } from '../../../src/mappers';
import { stringMapper } from '../../../src/mappers/stringMapper';

describe('Mappers, unit tests', () => {
  describe('stringMapper', () => {
      const dataProvider = [
          // it is designed for string input only
          {inValue: '', expectedResult: ''},
          {inValue: '0', expectedResult: '0'},
          {inValue: 'a', expectedResult: 'a'},
          {inValue: '0x0', expectedResult: '0x0'},
          {inValue: '[]', expectedResult: '[]'},
          {inValue: '[1,2,3]', expectedResult: '[1,2,3]'},
          {inValue: '{}', expectedResult: '{}'},
          {inValue: '{a:[1,2,3]}', expectedResult: '{a:[1,2,3]}'},

          // invalid input (out of design) - if input is not string should pass same value forward
          {inValue: null, expectedResult: null},
          {inValue: undefined, expectedResult: undefined},
          {inValue: true, expectedResult: true},
          {inValue: false, expectedResult: false},
          {inValue: 0, expectedResult: 0},
          {inValue: 0x0, expectedResult: 0x0},
      ];
      dataProvider.forEach(({inValue, expectedResult}) => {
          it(`stringMapper for input "${inValue}" SHOULD return "${expectedResult}"`, () => {
              chai.expect(stringMapper(inValue as string)).equal(expectedResult);
          });
      });
  });

  describe('upperCaseMapper', () => {
      const dataProvider = [
          { inValue: '', expectedResult: '' },
          { inValue: 'asd', expectedResult: 'ASD' },
          { inValue: 'Asd', expectedResult: 'ASD' },
          { inValue: 'ASD', expectedResult: 'ASD' },
          { inValue: 'asd ASD', expectedResult: 'ASD ASD' },
      ];
      dataProvider.forEach(({inValue, expectedResult}) => {
          it(`upperCaseMapper for input "${inValue}" SHOULD return "${expectedResult}"`, () => {
              chai.expect(upperCaseMapper(inValue)).equal(expectedResult);
          });
      });
  });
});
