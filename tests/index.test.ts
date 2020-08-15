import * as chai from 'chai'

import Index from '../src/Index' 

describe('sample"', function () {
    
    it('sample test"', async function () {
        const index = new Index();

        chai.expect(index.DoSomething()).eql("do nothing");
    });
});