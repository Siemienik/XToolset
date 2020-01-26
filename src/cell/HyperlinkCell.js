import BaseCell from "./BaseCell";
import Scope from "../Scope";
import {ValueType} from "exceljs";

export default class HyperlinkCell extends BaseCell {
    /**
     * @param {Scope} scope
     * @returns {HyperlinkCell}
     */
    apply(scope) {
        super.apply(scope);

        scope.setCurrentOutputValue(null);

        const url = HyperlinkCell._getUrlParam(scope).split('.').reduce((p, c) => p[c] || {}, scope.vm);
        if (typeof url === 'string') {
            const label = HyperlinkCell._getLabelParam(scope).split('.').reduce((p, c) => p[c] || {}, scope.vm) || url;
            console.log(label);
            scope.setCurrentOutputValue({text: label, hyperlink: url});
        }

        scope.incrementCol();

        return this;
    }

    /**
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    static _getLabelParam(scope) {
        return scope.getCurrentTemplateValue().split(' ')[2];
    }

    /**
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    static _getUrlParam(scope) {
        return scope.getCurrentTemplateValue().split(' ')[3];
    }

    /**
     * @param {Cell} cell
     * @returns {boolean}
     */
    static match(cell) {
        return cell && cell.type === ValueType.String && typeof cell.value === 'string' && cell.value.substring(0, 12) === '#! HYPERLINK';
    }
}