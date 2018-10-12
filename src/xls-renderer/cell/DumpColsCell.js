import BaseCell from "./BaseCell";

export default class DumpColsCell extends BaseCell {
    /**
     * @inheritDoc
     * @param {Scope} scope
     * @returns {DumpColsCell}
     */
    apply(scope) {
        super.apply(scope);

        const path = scope.getCurrentTemplateValue().substring(13).split('.');
        const cols = path.reduce((p, c) => p[c] || [], scope.vm);

        scope.setCurrentOutputValue(null);

        cols.forEach((x) => {
            scope.setCurrentOutputValue(x);
            scope.applyStyles();
            scope.output_cell = Object.freeze({...scope.output_cell, c: scope.output_cell.c + 1});
        });

        scope.incrementColl();

        return this;
    }

    /**
     * @inheritDoc
     * @param {string} value
     * @returns {boolean}
     */
    static match(value) {
        return value.substring(0, 12) === '#! DUMP_COLS';
    }

}
