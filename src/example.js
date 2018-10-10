import Renderer from './xls-renderer/Renderer'
import DebugCellTemplatePool from "./xls-renderer-debug/CellTemplateDebugPool";
import CellTemplatePool from "./xls-renderer/CellTemplatePool";
import {Workbook} from 'exceljs'
//*
const renderer = new Renderer(new CellTemplatePool());
/*/
const renderer = new Renderer(new DebugCellTemplatePool());
//*/

(async () => {
    const result = await renderer.render(async () => {
        const template = new Workbook();
        return await template.xlsx.readFile('../template.xlsx');
    }, {
        name: "Pierwszy",
        super: {test: 123},
        items: [
            {firstName: "Paweł", secondName: "Siemienik"},
            {firstName: "Other", secondName: "Siemie"},
            {firstName: "Other", secondName: "Stranger"},
            {firstName: "Paweł", secondName: "Siemienik"},
            {firstName: "Other", secondName: "Siemie"},
            {firstName: "Other", secondName: "Stranger"},
            {firstName: "Paweł", secondName: "Siemienik"},
            {firstName: "Other", secondName: "Siemie"},
            {firstName: "Other", secondName: "Stranger"},
            {firstName: "Paweł", secondName: "Siemienik"},
            {firstName: "Other", secondName: "Siemie"},
            {firstName: "Other", secondName: "Siemie"},
            {firstName: "Other", secondName: "Stranger"},
            {firstName: "Paweł", secondName: "Siemienik"},
            {firstName: "Other", secondName: "Siemie"},
            {firstName: "LAST", secondName: "Stranger"},
            {firstName: "LAST", secondName: "Stranger"},
        ]
    });

    await result.xlsx.writeFile('../out.xlsx');
})();
// 


/*todo
5. pobieranie parametrów w loop
6. copy style

*/