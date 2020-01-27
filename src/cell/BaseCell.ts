import { Cell } from 'exceljs';

import { Scope } from '../Scope';

export declare type CellType = typeof BaseCell;

export class BaseCell {
    /**
     * check if this commend can parse `value`
     */
    public static match(cell: Cell) {
        return false;
    }

    public BaseCell() {
        throw new TypeError(`Cannot construct ${BaseCell.name} instances directly. It's abstract.`);
    }

    public apply(scope: Scope) {
        if (scope.outputCell.c > 16384) {
            scope.outputCell = Object.freeze({ ...scope.outputCell, c: 16384 });
        }
        scope.setCurrentOutputValue(scope.getCurrentTemplateValue());
        scope.applyStyles();
        scope.applyMerge();

        return this;
    }
}
