import ForEachCell from "./ForEachCell";
import {ValueType} from "exceljs";

class ContinueCell extends ForEachCell {
    /**
     * @inheritDoc
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    _getFromParam(scope) {
        const target = ForEachCell._getTargetParam(scope);

        return scope.vm[target] && scope.vm[target].__from;
    }

    /**
     * @inheritDoc
     * @param {Cell} cell
     * @returns {boolean}
     */
    static match(cell) {
        return cell && cell.type === ValueType.String && typeof cell.value === 'string' && cell.value.substring(0, 11) === '#! CONTINUE';
    }

}

export default ContinueCell