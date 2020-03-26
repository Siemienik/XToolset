import { ForEachCell } from './ForEachCell';
import { Cell, ValueType } from 'exceljs';
import { Scope } from '../Scope';

export class ContinueCell extends ForEachCell {
    public static match(cell: Cell): boolean {
        return (
            cell &&
            cell.type === ValueType.String &&
            typeof cell.value === 'string' &&
            cell.value.substring(0, 11) === '#! CONTINUE'
        );
    }

    public getSourceParam(scope: Scope): string {
        const target = ForEachCell.getTargetParam(scope);

        return scope.vm[target] && scope.vm[target].__from;
    }
}
