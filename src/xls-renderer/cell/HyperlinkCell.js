import BaseCell from "./BaseCell";
import Scope from "../Scope";

export default class HyperlinkCell extends BaseCell {
    /**
     * @param {Scope} scope
     * @returns {ForEachCell}
     */
    apply(scope) {
        super.apply(scope);

        scope.setCurrentOutputValue(null);

        const url = this._getUrlParam(scope).split('.').reduce((p, c) => p[c] || {}, scope.vm);
        if (typeof url === 'string') {
            const label = this._getLabelParam(scope).split('.').reduce((p, c) => p[c] || {}, scope.vm) || url;
            console.log(label);
            scope.setCurrentOutputValue({text: label, hyperlink: url});
        }
        
        scope.incrementColl();

        return this;
    }

    /**
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    _getLabelParam(scope) {
        return scope.getCurrentTemplateValue().split(' ')[2];
    }

    /**
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    _getUrlParam(scope) {
        return scope.getCurrentTemplateValue().split(' ')[3];
    }

    /**
     * @param {string} value
     * @returns {boolean}
     */
    static match(value) {
        return typeof value === 'string' && value.substring(0, 12) === '#! HYPERLINK';
    }
}