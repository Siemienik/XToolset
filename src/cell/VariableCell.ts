import { BaseCell } from './BaseCell';
import { Cell, ValueType } from 'exceljs';
import { Scope } from '../Scope';

export class VariableCell extends BaseCell {
    public static match(cell: Cell): boolean {
        return (
            cell &&
            cell.type === ValueType.String &&
            typeof cell.value === 'string' &&
            cell.value.substring(0, 2) === '##'
        );
    }

    public apply(scope: Scope) {
        super.apply(scope);

        const path =
            scope
                .getCurrentTemplateValue()
                ?.toString()
                .substring(3)
                .split('.') || [];

        const value = path.reduce((p, c) => (typeof p === 'object' ? p[c] : p), scope.vm);
        if (value === undefined) {
            // todo do it better (use logger or somethink like that)
            // tslint:disable-next-line:no-console
            console.warn(
                `WARN: ${path} is undefined for output: ${scope.outputCell} when template is:${scope.templateCell}`,
            );
        }
        scope.setCurrentOutputValue(value);
        scope.incrementCol();

        return this;
    }
}
