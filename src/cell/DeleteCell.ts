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

        const target = scope
            .getCurrentTemplateValue()
            ?.toString()
            .split(' ')[2]; // todo make some function for scope.getCurrentTemplateValue()?.toString().split(' ')  ;

        if (target === undefined) {
            return this;
        } // it's ok here

        scope.vm[target] = undefined;

        scope.setCurrentOutputValue(null);
        scope.incrementCol();

        return this;
    }
}
