import Scope from "./Scope";
import CellTemplatePool from "./CellTemplatePool"

class Rederer {
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
     * @param {{}} template todo
     * @param {{}} vm
     * @returns {{}} output file
     */
    render(template, vm) {
        const output = this._createOutput(template);
        const scope = new Scope(template, output, vm);

        while (!scope.isFinished()) {
            scope.tryPayOffDept();

            const value = scope.getCurrentTemplateValue();

            if (typeof value === "undefined") {
                break;
            }

            this._cellTemplatePool.match(value).apply(scope);


        }

        return output;
    }

    /**
     * @param {{}} template todo
     * @returns {{}} output
     * @private
     */
    _createOutput(template) { //todo
        return {...template};
    }
}

export default Rederer