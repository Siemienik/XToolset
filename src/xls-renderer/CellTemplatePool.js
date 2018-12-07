import VariableCell from "./cell/VariableCell";
import NormalCell from "./cell/NormalCell";
import FinishCell from "./cell/FinishCell";
import ForEachCell from "./cell/ForEachCell";
import ContinueCell from "./cell/ContinueCell";
import EndLoopCell from "./cell/EndLoopCell";
import EndRowCell from "./cell/EndRowCell";
import SumCell from "./cell/SumCell";
import AverageCell from "./cell/AverageCell";
import DeleteCell from "./cell/DeleteCell";
import DumpColsCell from "./cell/DumpColsCell";
import WsNameCell from "./cell/WsNameCell";
import HyperlinkCell from "./cell/HyperlinkCell";

export default class CellTemplatePool {
    /**
     * @type {*[]}
     * @private
     */
    _cells = [
        NormalCell,
        EndRowCell,
        VariableCell,
        HyperlinkCell,
        ForEachCell,
        FinishCell,
        EndLoopCell,
        ContinueCell,
        DumpColsCell,
        SumCell,
        AverageCell,
        WsNameCell,
        DeleteCell,
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
        const type = this._cells.find((x) => x.match(value || ''));

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
