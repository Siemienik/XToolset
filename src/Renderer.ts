import Scope from "./Scope";
import CellTemplatePool from "./CellTemplatePool"
import {Workbook} from "exceljs";

export default class Renderer {
    constructor(private cellTemplatePool: CellTemplatePool = new CellTemplatePool) {
    }


    async render(templateFactory: () => Workbook, vm: any): Promise<Workbook> {
        const template = await templateFactory();
        const output = await templateFactory();

        const scope = new Scope(template, output, vm);

        while (!scope.isFinished()) {
            this.cellTemplatePool.match(scope.getCurrentTemplateCell()).apply(scope);
        }

        return output;
    }
}