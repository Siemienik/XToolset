class Scope {
    template;
    output;

    /** @var {{}} view model*/
    vm;
    output_cell = 0; //todo cell type
    template_cell = 0; //todo cell type


    /**
     * @var {boolean} is output frozen
     * @private
     */
    _frozen = false;
    /**
     * @var {boolean}
     * @private
     */
    _finished = false;

    /**
     * @var {int}
     * @private
     */
    _frozenDept = 0;

    /**
     * todo types
     * @param template
     * @param output
     * @param vm
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
        return this._finished ? '' : this.template[this.template_cell];
    }

    /**
     * @param {string} value
     */
    setCurrentOutputValue(value) {
        if (!this._frozen) {
            this.output[this.output_cell] = value;
        }
    }

    /**
     * increment index for
     *
     * @param {int} template
     * @param {int} output
     */
    incrementColl(template = 1, output = 1) {
        this.template_cell += template;
        if (this._frozen) {
            this._frozenDept += output;
        } else {
            this.output_cell += output;
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
        return this._finished && this._frozenDept <= 0;
    }

    tryPayOffDept() {
        if (this._finished) {
            this._frozenDept--;
        }
    }
}


export default Scope;