import BaseCell from "./BaseCell";
import {ValueType} from "exceljs";

class VariableCell extends BaseCell {
    /**
     * @inheritDoc
     * @param {Scope} scope
     * @returns {VariableCell}
     */
    apply(scope) {
        super.apply(scope);

        const path = scope.getCurrentTemplateValue().substring(3).split('.');

        scope.setCurrentOutputValue(path.reduce((p, c) => p[c] || {}, scope.vm));
        scope.incrementCol();

        return this;
    }

    /**
     * @inheritDoc
     * @param {Cell} cell
     * @returns {boolean}
     */
    static match(cell) {
        return cell && cell.type === ValueType.String && typeof cell.value === 'string' && cell.value.substring(0, 2) === '##';
    }

}

export default VariableCell