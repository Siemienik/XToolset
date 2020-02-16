import { CellTemplatePool } from './CellTemplatePool';
import { Cell } from 'exceljs';
import { BaseCell } from './cell/BaseCell';
/* tslint:disable:no-console */
export class CellTemplateDebugPool extends CellTemplatePool {
    /**
     * do normal match and log in console result.
     */
    public match(cell: Cell): BaseCell {
        const result = super.match(cell);

        console.log(result, cell && cell.value);

        return result;
    }
}
