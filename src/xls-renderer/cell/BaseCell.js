import Scope from '../Scope'

/**
 * @abstract
 */
class BaseCell {
    constructor() {
        if (new.target === BaseCell) {
            throw new TypeError(`Cannot construct ${BaseCell.name} instances directly. It's abstract.`);
        }
    }

    /**
     *
     * @param {Scope} scope
     * @returns {BaseCell}
     */
    apply(scope) {
        if (!scope instanceof Scope) {
            throw new TypeError(`'scope' parameter has to be instance of ${Scope.name}`);
        }
        if (scope.output_cell.c > 16384) {
            scope.output_cell = Object.freeze({...this.output_cell, c: 16384});
        }
        scope.setCurrentOutputValue(scope.getCurrentTemplateValue());
        scope.applyStyles();

        return this;
    }

    /**
     * check if this commend can parse `value`
     *
     * @param {string} value
     * @returns {boolean}
     */
    static match(value) {
        return false;
    }

}

export default BaseCell