import { Cell } from 'exceljs';

import { Scope } from '../Scope';

export declare type CellType = typeof BaseCell;

export /* abstract */ class BaseCell {
    // can't be abstract :(
    /**
     * check if this commend can parse `value`
     */
    public static match(cell: Cell): boolean {
        return false;
    }

    public BaseCell() {
        // can't be marked by abstract keyword, so it throw type error.
        throw new TypeError(`Cannot construct ${BaseCell.name} instances directly. It's abstract.`);
    }

    public apply(scope: Scope): BaseCell {
        if (scope.outputCell.c > 16384) {
            scope.outputCell = Object.freeze({ ...scope.outputCell, c: 16384 });
        }
        scope.setCurrentOutputValue(scope.getCurrentTemplateValue());
        scope.applyStyles();
        scope.applyMerge();

        return this;
    }
}
