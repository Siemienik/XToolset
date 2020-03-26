import {Renderer} from "../../src/Renderer";
import * as fs from "fs";
import {Dirent} from "fs";
import * as path from "path";
import {Workbook} from "exceljs";
import * as chai from 'chai'

function isDir(path: Dirent | string): boolean {
    if (path instanceof Dirent) return path.isDirectory();

    try {
        return fs.lstatSync(path).isDirectory();
    } catch (e) {
        return false;// lstatSync throws an error if path doesn't exist
    }
}

function assertCells(expected: Workbook, result: Workbook, factor: number = 10) {
    chai.expect(expected.worksheets.length).eql(result.worksheets.length);
    chai.expect(expected.worksheets.map(x => x.name)).eql(result.worksheets.map(x => x.name));

    for (let wi = 0; wi < expected.worksheets.length; wi++) {
        const ws = {e: expected.worksheets[wi], r: result.worksheets[wi]};
        for (let i = 0; i < factor * factor; i++) {
            const r = Math.floor(i / factor) + 1;
            const c = i % factor + 1;
            const cell = {
                e: ws.e.getCell(r, c),
                r: ws.r.getCell(r, c)
            };


            if (r === 1) {
                chai.expect(ws.r.getColumn(c).width).eql(ws.e.getColumn(c).width);
            }
            if (c === 1) {
                chai.expect(ws.r.getRow(r).height).eql(ws.e.getRow(r).height);
            }

            // console.log(r,c);
            chai.expect(cell.r.style).eql(cell.e.style);
            chai.expect(cell.r.text).eql(cell.e.text);
            chai.expect(cell.r.value).eql(cell.e.value);
        }
    }
}

describe('INTEGRATION:: Test xlsx renderer ', function () {

    describe('Checking if assertCells works ok.', function () {
        it('Same - should pass ok', async function () {
            const expected = await new Workbook().xlsx.readFile(path.join(__dirname, 'data', 'assertCells', 'main.xlsx'));
            const correct = await new Workbook().xlsx.readFile(path.join(__dirname, 'data', 'assertCells', 'correct.xlsx'));

            assertCells(expected, correct, 20);
        });

        it('Different - attempt to broke assertions', async function () {
            const expected = await new Workbook().xlsx.readFile(path.join(__dirname, 'data', 'assertCells', 'main.xlsx'));
            const failedWorksheetAmount = await new Workbook().xlsx.readFile(path.join(__dirname, 'data', 'assertCells', 'f-ws-amount.xlsx'));
            const failedWorksheetNames = await new Workbook().xlsx.readFile(path.join(__dirname, 'data', 'assertCells', 'f-ws-names.xlsx'));
            const failedWidth = await new Workbook().xlsx.readFile(path.join(__dirname, 'data', 'assertCells', 'f-width.xlsx'));
            const failedHeight = await new Workbook().xlsx.readFile(path.join(__dirname, 'data', 'assertCells', 'f-height.xlsx'));
            const failedStyle = await new Workbook().xlsx.readFile(path.join(__dirname, 'data', 'assertCells', 'f-style.xlsx'));
            const failedText = await new Workbook().xlsx.readFile(path.join(__dirname, 'data', 'assertCells', 'f-text.xlsx'));
            const failedValue = await new Workbook().xlsx.readFile(path.join(__dirname, 'data', 'assertCells', 'f-value.xlsx'));
            const failedTable = await new Workbook().xlsx.readFile(path.join(__dirname, 'data', 'assertCells', 'f-table.xlsx'));

            chai.expect(() => assertCells(expected, failedWorksheetAmount, 20)).throw("expected 2 to deeply equal 3");
            chai.expect(() => assertCells(expected, failedWorksheetNames, 20)).throw('expected [ \'Sheet1\', \'Sheet2\' ] to deeply equal [ \'Sheet1\', \'Sheet3\' ]');
            chai.expect(() => assertCells(expected, failedWidth, 20)).throw("expected 7.90625 to deeply equal 13");
            chai.expect(() => assertCells(expected, failedHeight, 20)).throw("expected 34.5 to deeply equal 15");
            chai.expect(() => assertCells(expected, failedStyle, 20)).throw("expected { Object (font, border, ...) } to deeply equal { Object (font, border, ...) }");
            chai.expect(() => assertCells(expected, failedText, 20)).throw('expected \'sadas\' to deeply equal \'sadasd\'');
            chai.expect(() => assertCells(expected, failedValue, 20)).throw('expected \'asdasda\' to deeply equal { Object (formula, result) }');
            chai.expect(() => assertCells(expected, failedTable, 20)).throw('expected { Object (font, border, ...) } to deeply equal { Object (font, border, ...) }');
        });
    });
    describe('Load examples, render and compare with expected result', function () {
        const dataPath = path.normalize(path.join(__dirname, 'data/'));
        const sets = fs.readdirSync(path.normalize(dataPath), {withFileTypes: true})
            .filter(isDir)
            .filter(d => /^Renderer[0-9]*-/.test(d.name));


        const renderer = new Renderer();
        sets.forEach(s => {
            it(`Test for  ${s.name}`, async function () {
                const result = await renderer.renderFromFile(
                    path.join(dataPath, s.name, "template.xlsx"),
                    require(path.join(dataPath, s.name, 'viewModel.json'))
                );

                const expected = await new Workbook().xlsx.readFile(path.join(dataPath, s.name, "expected.xlsx"));

                try {
                    await result.xlsx.writeFile(path.join(dataPath, s.name, 'test-output.xlsx'));
                } catch (e) {
                }

                assertCells(expected, result);
            });


        })

    });
});