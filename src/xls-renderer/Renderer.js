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

        const scope = new Scope(template, output, vm);

        while (!scope.isFinished()) {
            this._cellTemplatePool.match(scope.getCurrentTemplateValue()).apply(scope);
        }

        return output;
    }
}