import { BaseCell } from './BaseCell';
import { Cell, ValueType } from 'exceljs';
import { Scope } from '../Scope';

/* tslint:disable:variable-name */
export class EndLoopCell extends BaseCell {
    public static match(cell: Cell): boolean {
        return (
            cell &&
            cell.type === ValueType.String &&
            typeof cell.value === 'string' &&
            cell.value.substring(0, 11) === '#! END_LOOP'
        );
    }

    public apply(scope: Scope): EndLoopCell {
        super.apply(scope);

        const target = scope.getCurrentTemplateString().split(' ')[2];
        const __start = scope.vm[target] && scope.vm[target].__start; // todo refactoring: simplify by using question mark
        const __iterated = scope.vm[target] && scope.vm[target].__iterated;

        scope.unfreezeOutput();

        const __insertRows = true;
        scope.vm[target] = Object.freeze({
            ...scope.vm[target],
            __end: scope.templateCell,
            __insetRows: __insertRows, // todo deprecate and remove further, it was a typo
            __insertRows,
        });

        if (__start && !__iterated) {
            scope.templateCell = __start;
        } else {
            scope.incrementRow();
        }

        return this;
    }
}
