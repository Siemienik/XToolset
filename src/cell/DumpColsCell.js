import BaseCell from "./BaseCell";
import {ValueType} from "exceljs";

export default class DumpColsCell extends BaseCell {
    /**
     * @inheritDoc
     * @param {Scope} scope
     * @returns {DumpColsCell}
     */
    apply(scope) {
        super.apply(scope);

        const path = scope.getCurrentTemplateValue().substring(13).split('.');
        const cols = path.reduce((p, c) => p[c] || [], scope.vm);

        scope.setCurrentOutputValue(null);

        cols.forEach((x) => {
            scope.setCurrentOutputValue(x);
            scope.applyStyles();
            scope.outputCell = Object.freeze({ ...scope.outputCell, c: scope.outputCell.c + 1 });
        });

        scope.incrementCol();

        return this;
    }

    /**
     * @inheritDoc
     * @param {Cell} cell
     * @returns {boolean}
     */
    static match(cell) {
        return cell && cell.type === ValueType.String && typeof cell.value === 'string' && cell.value.substring(0, 12) === '#! DUMP_COLS';
    }

}
