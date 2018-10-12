import BaseCell from "./BaseCell";

class EndLoopCell extends BaseCell {
    /**
     * @inheritDoc
     * @param {Scope} scope
     * @returns {EndLoopCell}
     */
    apply(scope) {
        super.apply(scope);

        const target = scope.getCurrentTemplateValue().split(' ')[2];
        const __start = scope.vm[target] && scope.vm[target].__start;
        const __iterated = scope.vm[target] && scope.vm[target].__iterated;

        scope.unfreezeOutput();
        scope.setCurrentOutputValue('');

        scope.vm[target] = Object.freeze({
            ...scope.vm[target],
            __end: scope.template_cell,
            __insetRows: true
        });

        if (__start && !__iterated) {
            scope.template_cell = __start;
        } else {
            scope.incrementRow();
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