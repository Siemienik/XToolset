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

        const value = path.reduce((p, c) => typeof p === 'object' ? p[c] : p, scope.vm);
        if (value === undefined) { //todo do it better (use logger or somethink like that)
            console.log(`WARN: ${path} is undefined for output: ${scope.outputCell} when template is:${scope.templateCell}`);
        }
        scope.setCurrentOutputValue(value);
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