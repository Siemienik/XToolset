import { BaseCell } from './BaseCell';
import { Cell, ValueType } from 'exceljs';
import { Scope } from '../Scope';

export class DeleteCell extends BaseCell {
    public static match(cell: Cell): boolean {
        return (
            cell &&
            cell.type === ValueType.String &&
            typeof cell.value === 'string' &&
            cell.value.substring(0, 9) === '#! DELETE'
        );
    }

    public apply(scope: Scope): DeleteCell {
        super.apply(scope);

        const target = scope.getCurrentTemplateString().split(' ')[2];

        if (target !== undefined) {
            scope.vm[target] = undefined;
        }

        scope.setCurrentOutputValue(null);
        scope.incrementCol();

        return this;
    }
}
