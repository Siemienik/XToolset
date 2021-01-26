import { Workbook } from 'exceljs';

import { Scope } from './Scope';
import { CellTemplatePool } from './CellTemplatePool';

export class Renderer {
    constructor(private cellTemplatePool: CellTemplatePool = new CellTemplatePool()) {}

    public async render(templateFactory: () => Promise<Workbook>, vm: unknown): Promise<Workbook> {
        const template = await templateFactory();
        const output = await templateFactory();

        // todo Temporary fixation for VM mutating problem, @see https://github.com/Siemienik/XToolset/issues/137
        const vmCopy = JSON.parse(JSON.stringify(vm));

        const scope = new Scope(template, output, vmCopy);

        while (!scope.isFinished()) {
            this.cellTemplatePool.match(scope.getCurrentTemplateCell()).apply(scope);
        }

        return output;
    }

    public async renderFromFile(templatePath: string, viewModel: unknown): Promise<Workbook> {
        const result = await this.render(async () => {
            const template = new Workbook();
            return await template.xlsx.readFile(templatePath);
        }, viewModel);

        return await result;
    }

    public async renderFromArrayBuffer(templateArrayBuffer: ArrayBuffer, viewModel: unknown): Promise<Workbook> {
        const result = await this.render(async () => {
            const template = new Workbook();
            return await template.xlsx.load(templateArrayBuffer);
        }, viewModel);

        return await result;
    }
}
