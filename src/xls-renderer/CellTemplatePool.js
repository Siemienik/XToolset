import VariableCell from "./cell/VariableCell";
import NormalCell from "./cell/NormalCell";
import FinishCell from "./cell/FinishCell";
import ForEachCell from "./cell/ForEachCell";
import ContinueCell from "./cell/ContinueCell";
import EndLoopCell from "./cell/EndLoopCell";
import EndRowCell from "./cell/EndRowCell";

class CellTemplatePool {
    /**
     * @type {*[]}
     * @private
     */
    _cells = [
        NormalCell,
        EndRowCell,
        VariableCell,
        ForEachCell,
        FinishCell,
        EndLoopCell,
        ContinueCell
    ];

    /**
     * @type {{}}
     * @private
     */
    _instances = {};

    /**
     * @param {string} value
     * @returns {BaseCell}
     */
    match(value) {
        const type = this._cells.find((x) => x.match(value));

        return type ? this._getInstance(type) : this._getInstance(NormalCell);
    }

    /**
     *
     * @param  {Function} type Class
     * @returns {BaseCell}
     * @private
     */
    _getInstance(type) {

        if (!this._cells.includes(type)) {
            throw new TypeError(`parameter 'type' has to included in [${this._cells.map((x) => x.name)}]`);
        }

        if (!this._instances[type.name]) {
            this._instances[type.name] = new type();
        }


        return this._instances[type.name];

    }
}

export default CellTemplatePool