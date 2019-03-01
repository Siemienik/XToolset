import BaseCell from "./BaseCell";
import {ValueType} from "exceljs";

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
     * @param {Cell} cell
     * @returns {boolean}
     */
    static match(cell) {
        return cell && cell.type === ValueType.String && typeof cell.value === 'string' && !['##', '#!'].includes(cell.value.substring(0, 2));
    }

}

export default NormalCell