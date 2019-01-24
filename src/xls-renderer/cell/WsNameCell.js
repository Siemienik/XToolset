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

        scope.output.worksheets[scope.output_cell.ws].name = this._getName(scope);
        scope.incrementCol();

        return this;
    }

    /**
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    _getName(scope) {
        let name = this._getTagetValue(scope) || this._getTarget(scope);
        name = name.replace(/[\\\/*\[\]?]/g, '.');

        if (scope.output.worksheets.find(x => x.name === name)) {
            name += ` ${scope.output_cell.ws}`;
        }
        
        name = name.length > 31 ? name.substr(name.length - 31) : name;

        return name;
    }

    /**
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    _getTagetValue(scope) {
        return this._getTarget(scope).split('.').reduce((p, c) => p[c] || "", scope.vm);
    }

    /**
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    _getTarget(scope) {
        return scope.getCurrentTemplateValue().split(' ')[2];
    }

    static match(value) {
        return typeof value === 'string' && value.substring(0, 10) === '#! WS_NAME';
    }

}