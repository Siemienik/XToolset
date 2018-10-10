import ForEachCell from "./ForEachCell";

class ContinueCell extends ForEachCell {
    /**
     * @inheritDoc
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    _getFromParam(scope) {
        const target = this._getTargetParam(scope);

        return scope.vm[target] && scope.vm[target].__from;
    }

    /**
     * @inheritDoc
     * @param {string} value
     * @returns {boolean}
     */
    static match(value) {
        return value.substring(0, 11) === '#! CONTINUE';
    }

}

export default ContinueCell