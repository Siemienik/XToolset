import * as chai from 'chai';

import { splitDP } from '../data/providers'

import { splitMapper } from '../../src/mappers';

describe('split single strings', function() {
    it('splitMapper return correct arrays', async function() {
        for (let i = 0; i < splitDP.length; i++) {
            const dataElement = splitDP[i];

            chai.expect(splitMapper(dataElement.inValue)).equals(dataElement.expectedResult);
        }
    }).timeout(15000);
});
