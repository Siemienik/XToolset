import * as chai from 'chai'

import {BaseCell} from '../../../src/cell/BaseCell'
import { Cell } from 'exceljs';

describe('BaseCell unit tests', function () {
    it('Abstract class `BaseCell` should be never instancied by keyword `new`', async function () {
        chai.expect(()=> new BaseCell()).throws("Cannot construct BaseCell instances directly. It's abstract.");
    });

    it('`BaseCell.match` should always return false', async function () {
        chai.expect(BaseCell.match({} as Cell)).equal(false);
        chai.expect(BaseCell.match({value: "## asds"} as Cell)).equal(false);
        chai.expect(BaseCell.match({value: "#! FOR_EACH"} as Cell)).equal(false);
        chai.expect(BaseCell.match({value: "some"} as Cell)).equal(false);
        chai.expect(BaseCell.match({value: ""} as Cell)).equal(false);
    });
});
