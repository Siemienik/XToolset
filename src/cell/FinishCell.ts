import { BaseCell } from './BaseCell';
import { Cell, ValueType } from 'exceljs';
import { Scope } from '../Scope';

export class FinishCell extends BaseCell {
    apply(scope: Scope): FinishCell {
        super.apply(scope);
        scope.setCurrentOutputValue(null);

        let wst = scope.template.worksheets[scope.templateCell.ws];

        if (FinishCell._getCondition(scope)) { //todo refactoring scope.iterateWorksheet 

            const wst_next = scope.templateCell.ws + 1;
            wst = scope.template.worksheets[wst_next];
            if (wst) {
                scope.templateCell = Object.freeze({
                    ...scope.templateCell,
                    ws: scope.templateCell.ws + 1,
                    r: 1,
                    c: 1
                });
                scope.outputCell = Object.freeze({ ...scope.outputCell, ws: scope.outputCell.ws + 1, r: 1, c: 1 });

                scope.unfreezeOutput();
            }
            else {
                scope.finish();
            }
        } else {//todo refactoring scope.duplicateWorksheet
            let wso = scope.output.addWorksheet(`Sheet ${scope.outputCell.ws + 1}`, wst); //todo if append , problems may happen

            scope.templateCell = Object.freeze({ ...scope.templateCell, r: 1, c: 1 });
            scope.outputCell = Object.freeze({ ...scope.outputCell, ws: scope.outputCell.ws + 1, r: 1, c: 1 });


            // noinspection JSCheckFunctionSignatures - todo exceljs type mismatch
            wst.getImages().forEach((i) => wso.addImage(+i.imageId, i.range));
        }


        return this;
    }

    static match(cell: Cell): boolean {
        return cell && cell.type === ValueType.String && typeof cell.value === 'string' && cell.value.substring(0, 9) === '#! FINISH';
    }

    /**
     * Rendering should finish when:
     * * condition params isn't set
     * * condition's path follow to undefined
     * * condition is true
     * In other way, the same template sheet should render next output sheet - as long as condition is false
     *
     * @param {Scope} scope
     * @returns {boolean}
     * @protected
     */
    private static _getCondition(scope: Scope): boolean {
        const args = scope.getCurrentTemplateValue()?.toString().split(' ') || [];
        if (args.length < 3) {
            return true;
        }

        return !!args[2].split('.').reduce(
            (p, c) => typeof p === 'undefined' || typeof p[c] === 'undefined' || p[c],
            scope.vm
        );
    }
}

