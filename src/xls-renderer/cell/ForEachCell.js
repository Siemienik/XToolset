import BaseCell from "./BaseCell";
import Scope from "../Scope";

/**
 * Pattern: `#! FOR_EACH [TARGET] [FROM]`
 * Iterate through `vm[FROM]` and store current item in readonly `vm[TARGET]`.
 * `vm[TARGET]` has additional fields:
 *
 * * `__from` - keeps `FROM` parameter's value
 * * `__index` - current 1-based iteration index (`vm[TARGET]` is `vm[FROM][__index-1]`)
 * * `__start` - template foreach start cell
 * * `__end` - template loop's end cell, it is undefined before first `END_LOOP`
 * * `__iterated` - iteration has been finished
 * * `__insetRows` - second and next iterations have to insert new rows
 * * `__startOutput` - first output cell
 * * `__endOutput` - last output cell
 */
class ForEachCell extends BaseCell {
    /**
     * @param {Scope} scope
     * @returns {ForEachCell}
     */
    apply(scope) {
        super.apply(scope);

        const target = this._getTargetParam(scope);
        const __from = this._getFromParam(scope);

        //todo refactoring
        const __index = (scope.vm[target] && scope.vm[target].__index || 0) + 1;
        const __start = scope.vm[target] && scope.vm[target].__start || scope.template_cell;
        const __startOutput = scope.vm[target] && scope.vm[target].__startOutput || scope.template_cell.r + 1;
        const __end = scope.vm[target] && scope.vm[target].__end;

        let __endOutput = scope.vm[target] && scope.vm[target].__endOutput;
        let __insetRows = scope.vm[target] && scope.vm[target].__insetRows || false;
       
        let next = __from.split('.').reduce((p, c) => p[c] || {}, scope.vm)[__index - 1];

        const __iterated = scope.vm[target] && scope.vm[target].__iterated || !next;

        scope.setCurrentOutputValue('');

        next = next || {};

        if (__insetRows) {
            __insetRows = false;
            for (let i = __end.r; i > __start.r; i--) {
                scope.output.getWorksheet(scope.output_cell.ws).spliceRows( //todo refactoring
                    scope.output_cell.r + 1,
                    0,
                    scope.template.getWorksheet(scope.template_cell.ws).getRow(i)
                );
            }
        }


        if (__iterated) {
            __endOutput = __endOutput || scope.output_cell.r;
            scope.freezeOutput();
        }

        scope.incrementRow();

        scope.vm[target] = Object.freeze({
            ...next,
            __from,
            __index,
            __start,
            __end,
            __iterated,
            __insetRows,
            __startOutput,
            __endOutput,
        });

        return this;
    }

    /**
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    _getTargetParam(scope) {
        return scope.getCurrentTemplateValue().split(' ')[2];
    }

    /**
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    _getFromParam(scope) {
        return scope.getCurrentTemplateValue().split(' ')[3];
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