import { BaseCell } from './BaseCell';
import { Cell, ValueType } from 'exceljs';
import { Scope } from '../Scope';

export class EndRowCell extends BaseCell {
    apply(scope: Scope): EndRowCell {
        super.apply(scope);

        scope.setCurrentOutputValue(null);
        scope.incrementRow();

        return this;
    }

    static match(cell: Cell): boolean {
        return cell && cell.type === ValueType.String && typeof cell.value === 'string' && cell.value === '#! END_ROW';
    }

}