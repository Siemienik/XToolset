import { BaseCell } from './BaseCell';
import { Cell, CellFormulaValue, ValueType } from 'exceljs';
import { Scope } from '../Scope';

const variableRegex = /\${[^{]+?}/g;

/**
 * @description
 * TemplateFormulaCell interpolate string and put it into cell as a formula
 * * starts width `#= `
 */
export class TemplateFormulaCell extends BaseCell {
    public static match(cell: Cell): boolean {
        return (
            cell &&
            cell.type === ValueType.String &&
            (cell.isMerged ? cell.master.address === cell.address : true) &&
            typeof cell.value === 'string' &&
            cell.value.substring(0, 3) === '#= '
        );
    }

    public apply(scope: Scope): TemplateFormulaCell {
        super.apply(scope);

        const template = scope.getCurrentTemplateString().substring(3);

        const formula = template.replace(variableRegex, match => {
            const path = match.slice(2, -1).split('.');

            // todo refactoring extract, similar like in VariableCell
            const value = path.reduce((p, c) => (typeof p === 'object' ? p[c] : p), scope.vm);
            if (value === undefined && !scope.isFrozen()) {
                // todo do it better (use logger or something like that)
                // tslint:disable-next-line:no-console
                console.warn(
                    `WARN: ${path} is undefined for template formula output: ${JSON.stringify(
                        scope.outputCell,
                    )} when template is:${JSON.stringify(scope.templateCell)}`,
                );
            }

            return value;
        });

        scope.setCurrentOutputValue({ formula } as CellFormulaValue);
        scope.incrementCol();

        return this;
    }
}
