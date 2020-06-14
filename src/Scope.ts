import { Address, Cell, CellValue, Workbook } from 'exceljs';
import { ViewModel } from './ViewModel';
import { ICellCoord } from './ICellCoord';

export class Scope {
    public outputCell: ICellCoord = Object.freeze({ r: 1, c: 1, ws: 0 });

    public templateCell: ICellCoord = Object.freeze({ r: 1, c: 1, ws: 0 });

    private masters: { [id: string]: Address } = {};

    private frozen: number = 0;

    private finished: boolean = false;

    constructor(public template: Workbook, public output: Workbook, public vm: ViewModel) {}

    public getCurrentTemplateString(): string {
        return this.getCurrentTemplateValue()?.toString() || '';
    }

    public getCurrentTemplateValue(): CellValue {
        return this.getCurrentTemplateCell().value;
    }

    public getCurrentTemplateCell(): Cell {
        return this.template.worksheets[this.templateCell.ws].getCell(this.templateCell.r, this.templateCell.c);
    }

    public setCurrentOutputValue(value: CellValue): void {
        if (this.frozen) {
            return;
        }
        this.output.worksheets[this.outputCell.ws].getCell(this.outputCell.r, this.outputCell.c).value = value;
    }

    public applyStyles(): void {
        if (this.frozen) {
            return;
        }
        const ct = this.templateCell;
        const wst = this.template.worksheets[ct.ws];
        const co = this.outputCell;
        const wso = this.output.worksheets[co.ws];
        wso.getRow(co.r).height = wst.getRow(ct.r).height;
        wso.getCell(co.r, co.c).style = wst.getCell(ct.r, ct.c).style;
        if (wst.getColumn(ct.c).isCustomWidth) {
            wso.getColumn(co.c).width = wst.getColumn(ct.c).width;
        }
    }

    public applyMerge(): void {
        const tws = this.template.worksheets[this.templateCell.ws];
        const tc = tws.getCell(this.templateCell.r, this.templateCell.c);

        const ows = this.output.worksheets[this.outputCell.ws];
        const current = ows.getCell(this.outputCell.r, this.outputCell.c).model.address;

        if (tc.model.master && tc.model.master !== tc.address) {
            const range = `${this.masters[tc.model.master] || tc.model.master}:${current}`;

            ows.unMergeCells(range);
            ows.mergeCells(range);
        } else if (tc.isMerged) {
            this.masters[tc.address] = current;
        }
    }

    public incrementCol(): void {
        if (!this.finished) {
            this.templateCell = Object.freeze({ ...this.templateCell, c: this.templateCell.c + 1 });
        }

        this.outputCell = Object.freeze({ ...this.outputCell, c: this.outputCell.c + 1 });
    }

    public incrementRow(): void {
        if (!this.finished) {
            this.templateCell = Object.freeze({ ...this.templateCell, r: this.templateCell.r + 1, c: 1 });
        }

        if (this.frozen) {
            this.output.worksheets[this.outputCell.ws].spliceRows(this.outputCell.r + 1, 1); // todo refactoring
            this.outputCell = Object.freeze({ ...this.outputCell, c: 1 });
        } else {
            this.outputCell = Object.freeze({ ...this.outputCell, r: this.outputCell.r + 1, c: 1 });
        }
    }

    public freezeOutput(): void {
        this.frozen++;
    }

    public unfreezeOutput(): void {
        this.frozen = Math.max(this.frozen - 1, 0);
    }

    public isFrozen(): boolean {
        return this.frozen > 0;
    }

    public finish(): void {
        this.finished = true;
        this.unfreezeOutput();
    }

    public isFinished(): boolean {
        return this.finished;
    }

    public isOutOfColLimit(): boolean {
        return this.outputCell.c > 16383;
    }
}
