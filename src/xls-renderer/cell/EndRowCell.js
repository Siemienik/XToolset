import BaseCell from "./BaseCell";

export default class EndRowCell extends BaseCell {
    /**
     * @param {Scope} scope
     *
     * @returns {EndRowCell}
     */
    apply(scope) {
        super.apply(scope);

        scope.setCurrentOutputValue("");
        scope.incrementRow();

        return this;
    }

    static match(value) {
        return value === '#! END_ROW';
    }

}