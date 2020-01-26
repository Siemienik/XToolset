import BaseCell from "./BaseCell";
import Scope from "../Scope";
import {ValueType} from "exceljs";

export default class AverageCell extends BaseCell {
    /**
     * @param {Scope} scope
     * @returns {AverageCell}
     */
    apply(scope) {
        super.apply(scope);

        const target = AverageCell._getTargetParam(scope);
        const __startOutput = scope.vm[target] && scope.vm[target].__startOutput;
        const __endOutput = scope.vm[target] && scope.vm[target].__endOutput;

        if (__startOutput && __endOutput) {
            const start = scope.output.worksheets[scope.output_cell.ws].getCell(__startOutput, scope.output_cell.c).address; //todo refactoring
            const end = scope.output.worksheets[scope.output_cell.ws].getCell(__endOutput, scope.output_cell.c).address; //todo refactoring

            scope.setCurrentOutputValue({formula: `average(${start}:${end})`});
        }

        scope.incrementCol();

        return this;
    }

    /**
     * @param {Scope} scope
     * @returns {string}
     * @protected
     */
    static _getTargetParam(scope) {
        return scope.getCurrentTemplateValue().split(' ')[2];
    }

    /**
     * @param {Cell} cell
     * @returns {boolean}
     */
    static match(cell) {
        return cell && cell.type === ValueType.String && typeof cell.value === 'string' && cell.value.substring(0, 10) === '#! AVERAGE';
    }
}