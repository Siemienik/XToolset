export default class Scope {

    /**
     * @var {Workbook}
     */
    template;

    /**
     * @var {Workbook}
     */
    output;

    /**
     * @var {{}} view model
     */
    vm;

    /**
     * @var {{r:int, c:int}}
     */
    output_cell = Object.freeze({r: 1, c: 1, ws: 1});

    /**
     * @var {{r:int, c:int}}
     */
    template_cell = Object.freeze({r: 1, c: 1, ws: 1});

    /**
     * @var {boolean}
     *
     * @private
     */
    _finished = false;


    /**
     * todo types
     * @param {Workbook} template
     * @param {Workbook} output
     * @param {{}} vm
     */
    constructor(template, output, vm) {
        this.template = template;
        this.output = output;
        this.vm = vm;
    }

    /**
     * @returns {string}
     */
    getCurrentTemplateValue() {
        return this.template.getWorksheet(this.template_cell.ws).getCell(this.template_cell.r, this.template_cell.c).text;
    }

    /**
     * @param {string} value
     */
    setCurrentOutputValue(value) {
        if (!this._frozen) {
            this.output.getWorksheet(this.output_cell.ws).getCell(this.output_cell.r, this.output_cell.c).value = value;
        }
    }

    applyStyles() {
        if (!this._frozen) {
            const ct = this.template_cell;
            const wst = this.template.getWorksheet(ct.ws);

            const co = this.output_cell;
            const wso = this.output.getWorksheet(co.ws); //todo refactoring

            wso.getRow(co.r).height = wst.getRow(ct.r).height;
            wso.getCell(co.r, co.c).style = wst.getCell(ct.r, ct.c).style;
        }
    }

    incrementColl() {
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
            this.output.getWorksheet(this.output_cell.ws).spliceRows(this.output_cell.r + 1, 1); //todo refactoring
            this.output_cell = Object.freeze({...this.output_cell, c: 1})
        } else {
            this.output_cell = Object.freeze({...this.output_cell, r: this.output_cell.r + 1, c: 1})
        }
    }

    freezeOutput() {
        this._frozen = true;
    }

    unfreezeOutput() {
        this._frozen = false;
    }

    finish() {
        this._finished = true;
        this.unfreezeOutput();
    }

    isFinished() {
        return this._finished;
    }

}
