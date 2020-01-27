import BaseCell from "./BaseCell";
import {ValueType} from "exceljs";

export default class WsNameCell extends BaseCell {
    /**
     * @param {Scope} scope
     *
     * @returns {WsNameCell}
     */
    apply(scope) {
        super.apply(scope);

        scope.setCurrentOutputValue(null);

        scope.output.worksheets[scope.outputCell.ws].name = this._getName(scope);
        scope.incrementCol();

        return this;
    }

    /**
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    _getName(scope) {
        let name = WsNameCell._getTargetValue(scope) || WsNameCell._getTarget(scope);
        name = name.replace(/[\\\/*\[\]?]/g, '.');

        if (scope.output.worksheets.find(x => x.name === name)) {
            name += ` ${scope.outputCell.ws}`;
        }
        
        name = name.length > 31 ? name.substr(name.length - 31) : name;

        return name;
    }

    /**
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    static _getTargetValue(scope) {
        return WsNameCell._getTarget(scope).split('.').reduce((p, c) => p[c] || "", scope.vm);
    }

    /**
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    static _getTarget(scope) {
        return scope.getCurrentTemplateValue().split(' ')[2];
    }

    /**
     * @param {Cell} cell
     * @return {boolean}
     */
    static match(cell) {
        return cell && cell.type === ValueType.String && typeof cell.value === 'string' && cell.value.substring(0, 10) === '#! WS_NAME';
    }

}