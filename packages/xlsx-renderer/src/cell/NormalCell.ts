import { Cell, ValueType } from 'exceljs';

import { BaseCell } from './BaseCell';
import { Scope } from '../Scope';

export class NormalCell extends BaseCell {
    /**
     * @inheritDoc
     * @param {Cell} cell
     * @returns {boolean}
     */
    public static match(cell: Cell): boolean {
        return (
            cell &&
            cell.type === ValueType.String &&
            typeof cell.value === 'string' &&
            !['##', '#!'].includes(cell.value.substring(0, 2))
        );
    }

    /**
     * @inheritDoc
     * @param {Scope} scope
     * @returns {NormalCell}
     */
    public apply(scope: Scope): NormalCell {
        super.apply(scope);

        scope.incrementCol();

        return this;
    }
}
