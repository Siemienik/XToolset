import { Cell } from 'exceljs';

import { BaseCell, CellType } from './cell/BaseCell';
import { NormalCell } from './cell/NormalCell';
import { TemplateFormulaCell } from './cell/TemplateFormulaCell';
import { TemplateStringCell } from './cell/TemplateStringCell';
import { VariableCell } from './cell/VariableCell';
import { FinishCell } from './cell/FinishCell';
import { ForEachCell } from './cell/ForEachCell';
import { ContinueCell } from './cell/ContinueCell';
import { EndLoopCell } from './cell/EndLoopCell';
import { EndRowCell } from './cell/EndRowCell';
import { SumCell } from './cell/SumCell';
import { AverageCell } from './cell/AverageCell';
import { DeleteCell } from './cell/DeleteCell';
import { DumpColsCell } from './cell/DumpColsCell';
import { WsNameCell } from './cell/WsNameCell';
import { HyperlinkCell } from './cell/HyperlinkCell';
import { FormulaCell } from './cell/FormulaCell';

export class CellTemplatePool {
    protected cells: CellType[] = [
        NormalCell,
        EndRowCell,
        VariableCell,
        TemplateStringCell,
        TemplateFormulaCell,
        FormulaCell,
        HyperlinkCell,
        ForEachCell,
        FinishCell,
        EndLoopCell,
        ContinueCell,
        DumpColsCell,
        SumCell,
        AverageCell,
        WsNameCell,
        DeleteCell,
    ];

    protected instances: Map<CellType, BaseCell> = new Map();

    public match(cell: Cell): BaseCell {
        const type: CellType = this.cells.find(x => x.match(cell)) || NormalCell;

        if (!this.instances.has(type)) {
            this.instances.set(type, new type());
        }

        return this.instances.get(type) as BaseCell;
    }
}
