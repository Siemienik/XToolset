import * as chai from 'chai';
import { ValueType, Workbook } from 'exceljs';
import { Renderer } from '../../src/Renderer';

const WS_NAME = 'test ws';

describe('BaseCell unit tests', () => {
    const factory = async (): Promise<Workbook> => {
        const template = new Workbook();
        template.addWorksheet(WS_NAME).addRow(['## testVar', '#! FINISH']);

        return template;
    };

    it('DateTime', async () => {
        const viewModel = {
            testVar: new Date(2023, 11, 17, 21, 37),
        };
        const renderer = new Renderer();
        const output = await renderer.render(factory, viewModel);

        chai.expect(output.getWorksheet(WS_NAME)?.getCell('A1').type).equals(ValueType.Date);
    });
});
