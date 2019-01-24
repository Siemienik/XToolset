import BaseCell from "./BaseCell";

class NormalCell extends BaseCell {
    /**
     * @inheritDoc
     * @param {Scope} scope
     * @returns {NormalCell}
     */
    apply(scope) {
        super.apply(scope);

        scope.incrementCol();

        return this;
    }

    /**
     * @inheritDoc
     * @param {string} value
     * @returns {boolean}
     */
    static match(value) {
        return typeof value === 'string' && !['##', '#!'].includes(value.substring(0, 2));
    }

}

export default NormalCell