import { Workbook } from 'exceljs';

import { Scope } from './Scope';
import { CellTemplatePool } from './CellTemplatePool';

export class Renderer {
    constructor(private cellTemplatePool: CellTemplatePool = new CellTemplatePool()) {
    }

    public async render(templateFactory: () => Workbook, vm: any): Promise<Workbook> {
        const template = await templateFactory();
        const output = await templateFactory();

        const scope = new Scope(template, output, vm);

        while (!scope.isFinished()) {
            this.cellTemplatePool.match(scope.getCurrentTemplateCell()).apply(scope);
        }

        return output;
    }
}
