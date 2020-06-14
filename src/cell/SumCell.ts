import { BaseCell } from './BaseCell';
import { Scope } from '../Scope';
import { Cell, CellFormulaValue, ValueType } from 'exceljs';

/* tslint:disable:variable-name */
export class SumCell extends BaseCell {
    public static match(cell: Cell): boolean {
        return (
            cell &&
            cell.type === ValueType.String &&
            typeof cell.value === 'string' &&
            cell.value.substring(0, 6) === '#! SUM'
        );
    }

    protected static getTargetParam(scope: Scope): string {
        return scope.getCurrentTemplateString().split(' ')[2];
    }

    public apply(scope: Scope): SumCell {
        super.apply(scope);

        const target = SumCell.getTargetParam(scope);
        const __startOutput = scope.vm[target] && scope.vm[target].__startOutput;
        const __endOutput = scope.vm[target] && scope.vm[target].__endOutput;

        if (__startOutput && __endOutput) {
            const start = scope.output.worksheets[scope.outputCell.ws].getCell(__startOutput, scope.outputCell.c)
                .address; // todo refactoring
            const end = scope.output.worksheets[scope.outputCell.ws].getCell(__endOutput, scope.outputCell.c).address; // todo refactoring

            scope.setCurrentOutputValue({ formula: `sum(${start}:${end})` } as CellFormulaValue);
        }

        scope.incrementCol();

        return this;
    }
}
