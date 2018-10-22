import BaseCell from "./BaseCell";

export default class WsNameCell extends BaseCell {
    /**
     * @param {Scope} scope
     *
     * @returns {EndRowCell}
     */
    apply(scope) {
        super.apply(scope);

        scope.setCurrentOutputValue(null);

        scope.output.getWorksheet(scope.output_cell.ws).name = this.getName(scope);
        scope.incrementColl();

        return this;
    }

    getName(scope) {
        let name = this._getTagetValue(scope) || `Sheet ${scope.output.getWorksheet(scope.output_cell.ws).id}`;
        name = name.replace(/[\\\/*\[\]?]/g, '.');
        name = name.length > 31 ? name.substr(name.length - 31) : name;

        return name;
    }

    /**
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    _getTagetValue(scope) {
        return scope.getCurrentTemplateValue().split(' ')[2].split('.').reduce((p, c) => p[c] || "", scope.vm);
    }

    static match(value) {
        return value.substring(0, 10) === '#! WS_NAME';
    }

}