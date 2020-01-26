import BaseCell from "./BaseCell";
import {ValueType} from "exceljs";

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

    static match(cell) {
        return cell && cell.type === ValueType.String && typeof cell.value === 'string' && cell.value === '#! END_ROW';
    }

}