import BaseCell from "./BaseCell";

class FinishCell extends BaseCell {
    apply(scope) {
        super.apply(scope);
        scope.setCurrentOutputValue(null);

        let wst = scope.template.getWorksheet(scope.template_cell.ws);
        if (FinishCell._getCondition(scope)) { //todo refactoring scope.iterateWorksheet 

            const wst_next = scope.template_cell.ws + 1;
            wst = scope.template.getWorksheet(wst_next);

            if (wst) {
                scope.template_cell = Object.freeze({...scope.template_cell, ws: wst.id, r: 1, c: 1});
                scope.output_cell = Object.freeze({...scope.output_cell, ws: scope.output_cell.ws + 1, r: 1, c: 1});

                wst.getImages().forEach((i) => wso.addImage(i.imageId, i.range));
                this.unfreezeOutput();

            }
            else {
                scope.finish();
            }
        } else {//todo refactoring scope.duplicateWorksheet
            let wso = scope.output.addWorksheet(`Sheet ${scope.output_cell.ws + 1}`, wst);

            scope.template_cell = Object.freeze({...scope.template_cell, ws: wst.id, r: 1, c: 1});
            scope.output_cell = Object.freeze({...scope.output_cell, ws: wso.id, r: 1, c: 1});

            wst.getImages().forEach((i) => wso.addImage(i.imageId, i.range));
        }


        return this;
    }

    static match(value) {
        return value.substring(0, 9) === '#! FINISH';
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
    static _getCondition(scope) {
        const args = scope.getCurrentTemplateValue().split(' ');
        if (args.length < 3) {
            return true;
        }

        return !!args[2].split('.').reduce(
            (p, c) => typeof p === 'undefined' || typeof p[c] === 'undefined' || p[c],
            scope.vm
        );
    }
}

export default FinishCell