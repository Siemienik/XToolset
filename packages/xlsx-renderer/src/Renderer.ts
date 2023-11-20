import { Workbook } from 'exceljs';

import { Scope } from './Scope';
import { CellTemplatePool } from './CellTemplatePool';
import { createVmProxyHandler } from './ViewModel';

export class Renderer {
    constructor(private cellTemplatePool: CellTemplatePool = new CellTemplatePool()) {}

    public async render(templateFactory: () => Promise<Workbook>, vm: unknown): Promise<Workbook> {
        const template = await templateFactory();
        const output = await templateFactory();

        const scope = new Scope(template, output, new Proxy(vm, createVmProxyHandler()));

        while (!scope.isFinished()) {
            this.cellTemplatePool.match(scope.getCurrentTemplateCell()).apply(scope);
        }

        return output;
    }

    public async renderFromFile(templatePath: string, viewModel: unknown): Promise<Workbook> {
        return this.render(async () => {
            const template = new Workbook();
            return await template.xlsx.readFile(templatePath);
        }, viewModel);
    }

    public async renderFromArrayBuffer(templateArrayBuffer: ArrayBuffer, viewModel: unknown): Promise<Workbook> {
        return this.render(async () => {
            const template = new Workbook();
            return await template.xlsx.load(templateArrayBuffer);
        }, viewModel);
    }
}
