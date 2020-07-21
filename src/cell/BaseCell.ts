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

    protected static isMasterCell(scope: Scope) {
        const templateCell = scope.template.worksheets[scope.templateCell.ws].getCell(
            scope.templateCell.r,
            scope.templateCell.c,
        );

        return !(
            templateCell &&
            templateCell.isMerged &&
            templateCell.master &&
            templateCell.master.address !== templateCell.address
        );
    }

    constructor() {
        if (this.constructor.name !== 'BaseCell') {
            return;
        }

        // can't be marked by abstract keyword, so it throw type error.
        throw new TypeError(`Cannot construct ${BaseCell.name} instances directly. It's abstract.`);
    }

    public apply(scope: Scope): BaseCell {
        if (scope.isOutOfColLimit()) {
            scope.finish(); // todo important: spec test
        }

        if (BaseCell.isMasterCell(scope)) {
            scope.setCurrentOutputValue(scope.getCurrentTemplateValue());
            scope.applyStyles();
        }

        scope.applyMerge();

        return this;
    }
}
