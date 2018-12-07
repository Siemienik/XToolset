import BaseCell from "./BaseCell";
import Scope from "../Scope";

export default class HyperlinkCell extends BaseCell {
    /**
     * @param {Scope} scope
     * @returns {ForEachCell}
     */
    apply(scope) {
        super.apply(scope);

        scope.setCurrentOutputValue({text: this._getLabelParam(scope), hyperlink: this._getUrlParam(scope)});
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
        return value.substring(0, 12) === '#! HYPERLINK';
    }
}