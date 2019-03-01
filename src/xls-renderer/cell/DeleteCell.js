import BaseCell from "./BaseCell";
import {ValueType} from "exceljs";

export default class DeleteCell extends BaseCell {
    apply(scope) {
        super.apply(scope);

        const target = scope.getCurrentTemplateValue().split(' ')[2];

        scope.vm[target] = undefined;

        scope.setCurrentOutputValue(null);
        scope.incrementCol();

        return this;
    }

    static match(cell) {
        return cell && cell.type === ValueType.String && typeof cell.value === 'string' && cell.value.substring(0, 9) === '#! DELETE';
    }

}