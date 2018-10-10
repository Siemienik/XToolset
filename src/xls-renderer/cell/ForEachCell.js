import BaseCell from "./BaseCell";
import Scope from "../Scope";

class ForEachCell extends BaseCell {
    /**
     * @param {Scope} scope
     * @returns {ForEachCell}
     */
    apply(scope) {
        super.apply(scope);

        const target = this._getTargetParam(scope);
        const __from = this._getFromParam(scope);

        const __index = (scope.vm[target] && scope.vm[target].__index || 0) + 1;
        const __start = scope.vm[target] && scope.vm[target].__start || scope.template_cell;
        const __end = scope.vm[target] && scope.vm[target].__end;
        let __insetRows = scope.vm[target] && scope.vm[target].__insetRows || false;

        let next = (scope.vm[__from] || {})[__index - 1];
        const __iterated = scope.vm[target] && scope.vm[target].__iterated || !next;

        scope.setCurrentOutputValue('');

        next = next || {};

        if (__insetRows) {
            __insetRows = false;
            for (let i = __end.r; i > __start.r; i--) {
                scope.output.getWorksheet(scope.output_cell.ws).spliceRows( //todo refactoring
                    scope.output_cell.r + 1,
                    0,
                    scope.template.getWorksheet(scope.template_cell.ws).getRow(i).values
                );
            }
        }


        if (__iterated) {
            scope.freezeOutput();
        }

        scope.incrementRow();

        scope.vm[target] = {...next, __from, __index, __start, __end, __iterated, __insetRows};

        return this;
    }

    /**
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    _getTargetParam(scope) {
        return 'i';
    }

    /**
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    _getFromParam(scope) {
        return 'items';
    }


    /**
     * @param {string} value
     * @returns {boolean}
     */
    static match(value) {
        return value.substring(0, 11) === '#! FOR_EACH';
    }
}

export default ForEachCell