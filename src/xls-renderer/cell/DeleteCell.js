import BaseCell from "./BaseCell";

export default class DeleteCell extends BaseCell {
    apply(scope) {
        super.apply(scope);

        const target = scope.getCurrentTemplateValue().split(' ')[2];

        scope.vm[target] = undefined;

        scope.setCurrentOutputValue(null);
        scope.incrementColl();

        return this;
    }

    static match(value) {
        return value.substring(0, 9) === '#! DELETE';
    }

}