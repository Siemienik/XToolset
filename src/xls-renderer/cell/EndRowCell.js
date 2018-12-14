import BaseCell from "./BaseCell";

export default class EndRowCell extends BaseCell {
    /**
     * @param {Scope} scope
     *
     * @returns {EndRowCell}
     */
    apply(scope) {
        super.apply(scope);

        scope.setCurrentOutputValue(null);
        scope.incrementRow();

        return this;
    }

    static match(value) {
        return typeof value === 'string' && value === '#! END_ROW';
    }

}