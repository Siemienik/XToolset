import BaseCell from "./BaseCell";

class ForEachCell extends BaseCell {
    /**
     * @param {Scope} scope
     * @returns {ForEachCell}
     */
    apply(scope) {
        super.apply(scope);

        const target = this._getTargetParam(scope);
        const __from = this._getFromParam(scope);

        const __index = scope.vm[target] && scope.vm[target].__index + 1 || 0;
        const __start = scope.vm[target] && scope.vm[target].__start || scope.template_cell;
        const __end = scope.vm[target] && scope.vm[target].__end;
        const next = (scope.vm[__from] || {})[__index];

        scope.setCurrentOutputValue('');

        if (next) {
            scope.vm[target] = {...next, __from, __index, __start, __end,};
        } else {
            if (__end) {
                scope.template_cell = __end;
            } else {
                scope.freezeOutput();
            }

            delete scope.vm[target];
        }

        scope.incrementColl();

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