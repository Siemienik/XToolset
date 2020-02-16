import { Renderer } from './Renderer';
import { CellTemplateDebugPool } from './CellTemplateDebugPool';
import { CellTemplatePool } from './CellTemplatePool';
import { Workbook } from 'exceljs';

// tslint:disable:comment-format 
//*
const debug = true;
/*/
const debug = false;
//*/

let renderer;
if (debug) {
    renderer = new Renderer(new CellTemplateDebugPool());
} else {
    renderer = new Renderer(new CellTemplatePool());
}

(async () => {
    const result = await renderer.render(async () => {
        const template = new Workbook();
        return await template.xlsx.readFile('./my-awesome-raport-template.xlsx');
    }, {});

    await result.xlsx.writeFile('./my-awesome-raport.xlsx');
})();
