import BaseCell from "./BaseCell";
import {ValueType} from "exceljs";

class FormulaCell extends BaseCell {
    /**
     * @inheritDoc
     * @param {Scope} scope
     * @returns {FormulaCell}
     */
    apply(scope) {
        super.apply(scope);

        const shift = scope.outputCell.r - scope.templateCell.r;

        const regex = /([a-zA-Z]+)([1-9][0-9]*)/g;
        const value = scope.getCurrentTemplateValue();
        let formula = value.formula;

        //todo extract method match addresses
        let matches;
        let addresses = [];
        while (matches = regex.exec(formula)) {
            addresses.push({index: matches.index, col: matches[1], row: +matches[2], len: matches[0].length})
        }
        addresses.reverse();

        //todo extract method getShiftedFormula
        let formulaChars = [...formula];
        addresses.forEach(a => formulaChars.splice(a.index, a.len, `${a.col}${a.row + shift}`));
        formula = formulaChars.join('');

        scope.setCurrentOutputValue({formula});

        scope.incrementCol();

        return this;
    }

    /**
     * @inheritDoc
     * @param {Cell} cell
     * @returns {boolean}
     */
    static match(cell) {
        return cell && cell.type === ValueType.Formula;
    }

}

export default FormulaCell