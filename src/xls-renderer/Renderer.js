import Scope from "./Scope";
import CellTemplatePool from "./CellTemplatePool"

export default class Renderer {
    /**
     *  @var {CellTemplatePool}
     */
    _cellTemplatePool;
    /**
     * @param {CellTemplatePool} cellTemplatePool
     */
    constructor(cellTemplatePool) {
        if (!cellTemplatePool instanceof CellTemplatePool) {
            throw new TypeError(`parameter 'cellTemplatePool' has to be instance of ${cellTemplatePool.name}`);
        }

        this._cellTemplatePool = cellTemplatePool;
    }


    /**
     * @param {()=Workbook} templateFactory
     * @param {Object} vm
     *
     * @returns {Workbook} output file
     */
    async render(templateFactory, vm) {
        const template = await templateFactory();
        const output = await templateFactory();

        const masters = {};
        const scope = new Scope(template, output, vm);

        while (!scope.isFinished()) {
            this._cellTemplatePool.match(scope.getCurrentTemplateValue()).apply(scope);

            //// TODO let's dry this hell!! (by creating MergedCell and adapt matching algorithm)  
            const tws = scope.template.worksheets[scope.template_cell.ws];
            const tc = tws.getCell(scope.template_cell.r, scope.template_cell.c);

            const ows = scope.output.worksheets[scope.output_cell.ws];
            const current = ows.getCell(scope.output_cell.r, scope.output_cell.c).model.address;

            if (tc.model.master && tc.model.master !== tc.model.address) {
                const range = `${masters[tc.master] || tc.model.master}:${current}`;

                ows.unMergeCells(range);
                ows.mergeCells(range);
            } else if (tc.isMerged) {
                masters[tc.model.address] = current;
            }
        }

        return output;
    }
}