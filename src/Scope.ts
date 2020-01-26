import {Address, Cell, CellValue, Workbook} from "exceljs";

export interface CellCoord {
    r: number;
    c: number;
    ws: number;
}

export default class Scope {

    public output_cell: CellCoord = Object.freeze({r: 1, c: 1, ws: 0});

    public template_cell: CellCoord = Object.freeze({r: 1, c: 1, ws: 0});

    private _masters: { [id: string]: Address; } = {};

    private _frozen: number = 0;

    private _finished: boolean = false;

    constructor(public template: Workbook, public output: Workbook, public vm: any) {
    }

    public getCurrentTemplateValue(): CellValue {
        return this.getCurrentTemplateCell().value;
    }

    getCurrentTemplateCell(): Cell {
        return this.template.worksheets[this.template_cell.ws].getCell(this.template_cell.r, this.template_cell.c);
    }

    setCurrentOutputValue(value: CellValue) {
        if (this._frozen) {
            return;
        }
        this.output.worksheets[this.output_cell.ws].getCell(this.output_cell.r, this.output_cell.c).value = value;
    }

    applyStyles() {
        if (this._frozen) {
            return;
        }
        const ct = this.template_cell;
        const wst = this.template.worksheets[ct.ws];
        const co = this.output_cell;
        const wso = this.output.worksheets[co.ws];
        wso.getRow(co.r).height = wst.getRow(ct.r).height;
        wso.getCell(co.r, co.c).style = wst.getCell(ct.r, ct.c).style;
        if (wst.getColumn(ct.c).isCustomWidth) {
            wso.getColumn(co.c).width = wst.getColumn(ct.c).width;
        }
    }

    applyMerge() {
        const tws = this.template.worksheets[this.template_cell.ws];
        const tc = tws.getCell(this.template_cell.r, this.template_cell.c);

        const ows = this.output.worksheets[this.output_cell.ws];
        const current = ows.getCell(this.output_cell.r, this.output_cell.c).model.address;

        if (tc.model.master && tc.model.master !== tc.address) {
            const range = `${this._masters[tc.model.master] || tc.model.master}:${current}`;

            ows.unMergeCells(range);
            ows.mergeCells(range);
        } else if (tc.isMerged) {
            this._masters[tc.address] = current;
        }
    }

    incrementCol() {
        if (!this._finished) {
            this.template_cell = Object.freeze({...this.template_cell, c: this.template_cell.c + 1});
        }

        this.output_cell = Object.freeze({...this.output_cell, c: this.output_cell.c + 1});
    }

    incrementRow() {
        if (!this._finished) {
            this.template_cell = Object.freeze({...this.template_cell, r: this.template_cell.r + 1, c: 1});
        }

        if (this._frozen) {
            this.output.worksheets[this.output_cell.ws].spliceRows(this.output_cell.r + 1, 1); //todo refactoring
            this.output_cell = Object.freeze({...this.output_cell, c: 1})
        } else {
            this.output_cell = Object.freeze({...this.output_cell, r: this.output_cell.r + 1, c: 1})
        }
    }

    freezeOutput() {
        this._frozen++;
    }

    unfreezeOutput() {
        this._frozen = Math.max(this._frozen - 1, 0);
    }

    /**
     * @returns {boolean}
     */
    isFrozen() {
        return this._frozen > 0;
    }

    finish() {
        this._finished = true;
        this.unfreezeOutput();
    }

    isFinished() {
        return this._finished;
    }

}
