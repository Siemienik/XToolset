import BaseCell from "./BaseCell";
import Scope from "../Scope";
import {ValueType} from "exceljs";

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
        const target = ForEachCell._getTargetParam(scope);
        const __from = this._getFromParam(scope);

        //todo refactoring
        const __index = (scope.vm[target] && scope.vm[target].__index || 0) + 1;
        if (__index === 1) {
            super.apply(scope);
        }
        
        const __start = scope.vm[target] && scope.vm[target].__start || scope.template_cell;
        const __startOutput = scope.vm[target] && scope.vm[target].__startOutput || scope.output_cell.r + 1;
        const __end = scope.vm[target] && scope.vm[target].__end;
        const __last = typeof __from.split('.').reduce((p, c) => p[c] || {}, scope.vm)[__index] === 'undefined';
        let __endOutput = scope.vm[target] && scope.vm[target].__endOutput;
        let __insetRows = scope.vm[target] && scope.vm[target].__insetRows || false;

        let next = __from.split('.').reduce((p, c) => p[c] || {}, scope.vm)[__index - 1];

        let __iterated = scope.vm[target] && scope.vm[target].__iterated;
        __iterated = typeof __iterated !== 'undefined' && __iterated;

        scope.setCurrentOutputValue(null);
        
        if (!__iterated && !next) {
            __iterated = true;
            scope.freezeOutput();
        }

        next = next || {};

        if (__insetRows) {
            __insetRows = false;
            if (!scope.isFrozen()) {
                for (let i = __end.r; i > __start.r; i--) {
                    // noinspection JSCheckFunctionSignatures - todo exceljs signature mismatch
                    scope.output.worksheets[scope.output_cell.ws].spliceRows( //todo refactoring
                        scope.output_cell.r + 1,
                        0,
                        scope.template.worksheets[scope.template_cell.ws].getRow(i)
                    );
                }
            }
        }

        if (__iterated) {
            __endOutput = __endOutput || scope.output_cell.r;
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
            __last
        });
        
        return this;
    }

    /**
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    static _getTargetParam(scope) {
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
     * @param {Cell} cell
     * @returns {boolean}
     */
    static match(cell) {
        return cell && cell.type === ValueType.String && typeof cell.value === 'string' && cell.value.substring(0, 11) === '#! FOR_EACH';
    }
}

export default ForEachCell