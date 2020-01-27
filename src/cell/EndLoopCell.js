import BaseCell from "./BaseCell";
import {ValueType} from "exceljs";

class EndLoopCell extends BaseCell {
    /**
     * @inheritDoc
     * @param {Scope} scope
     * @returns {EndLoopCell}
     */
    apply(scope) {
        super.apply(scope);

        const target = scope.getCurrentTemplateValue().split(' ')[2];
        const __start = scope.vm[target] && scope.vm[target].__start;
        const __iterated = scope.vm[target] && scope.vm[target].__iterated;

        scope.unfreezeOutput();

        scope.vm[target] = Object.freeze({
            ...scope.vm[target],
            __end: scope.templateCell,
            __insetRows: true
        });

        if (__start && !__iterated) {
            scope.templateCell = __start;
        } else {
            scope.incrementRow();
        }

        return this;
    }

    /**
     * @inheritDoc
     * @param {Cell} cell
     * @returns {boolean}
     */
    static match(cell) {
        return cell && cell.type === ValueType.String && typeof cell.value === 'string' && cell.value.substring(0, 11) === '#! END_LOOP';
    }

}

export default EndLoopCell