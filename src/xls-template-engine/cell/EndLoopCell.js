import BaseCell from "./BaseCell";

class EndLoopCell extends BaseCell {
    /**
     * @inheritDoc
     * @param {Scope} scope
     * @returns {EndLoopCell}
     */
    apply(scope) {
        super.apply(scope);

        const target = 'i';
        const __start = scope.vm[target] && scope.vm[target].__start;

        scope.unfreezeOutput();
        scope.setCurrentOutputValue('');

        if (__start) {
            scope.vm[target] = {...scope.vm[target], __end: scope.template_cell}
            scope.template_cell = __start;
        } else {
            scope.incrementColl();
        }


        return this;
    }

    /**
     * @inheritDoc
     * @param {string} value
     * @returns {boolean}
     */
    static match(value) {
        return value.substring(0, 11) === '#! END_LOOP';
    }

}

export default EndLoopCell