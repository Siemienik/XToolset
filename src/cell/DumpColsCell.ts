import { BaseCell } from './BaseCell';
import { Cell, ValueType } from 'exceljs';
import { Scope } from '../Scope';

export class DumpColsCell extends BaseCell {
    public static match(cell: Cell): boolean {
        return (
            cell &&
            cell.type === ValueType.String &&
            typeof cell.value === 'string' &&
            cell.value.substring(0, 12) === '#! DUMP_COLS'
        );
    }

    public apply(scope: Scope): DumpColsCell {
        super.apply(scope);

        const path = scope
            .getCurrentTemplateString()
            .substring(13)
            .split('.');
        const cols = Array.from(path).reduce((p, c) => p[c] || [], scope.vm);

        scope.setCurrentOutputValue(null);

        cols.forEach((x: any) => {
            scope.setCurrentOutputValue(x);
            scope.applyStyles();
            scope.outputCell = Object.freeze({ ...scope.outputCell, c: scope.outputCell.c + 1 });
        });

        scope.incrementCol();

        return this;
    }
}
