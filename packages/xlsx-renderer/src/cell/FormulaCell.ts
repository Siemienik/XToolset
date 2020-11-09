import { BaseCell } from './BaseCell';
import { Cell, CellFormulaValue, ValueType } from 'exceljs';
import { Scope } from '../Scope';

export class FormulaCell extends BaseCell {
    public static match(cell: Cell): boolean {
        return cell && cell.type === ValueType.Formula;
    }

    public apply(scope: Scope): FormulaCell {
        super.apply(scope);

        const shift = scope.outputCell.r - scope.templateCell.r;

        const regex = /([a-zA-Z]+)([1-9][0-9]*)/g;
        const value = scope.getCurrentTemplateValue() as CellFormulaValue;
        let formula = value.formula;

        // todo extract method match addresses
        const addresses = [];
        while (true) {
            const matches = regex.exec(formula);
            if (matches === null) {
                break;
            }

            addresses.push({ index: matches.index, col: matches[1], row: +matches[2], len: matches[0].length });
        }
        addresses.reverse();

        // todo extract method getShiftedFormula
        const formulaChars = Array.from(formula);
        addresses.forEach(a => formulaChars.splice(a.index, a.len, `${a.col}${a.row + shift}`));
        formula = formulaChars.join('');

        scope.setCurrentOutputValue({ formula } as CellFormulaValue);

        scope.incrementCol();

        return this;
    }
}
