import CellTemplatePool from "../xls-renderer/CellTemplatePool";

export default class CellTemplateDebugPool extends CellTemplatePool {
    /**
     * do normal match and log in console result.
     *
     * @param {string} value
     * @returns {BaseCell}
     */
    match(value) {
        const result = super.match(value);

        console.log(result, value);

        return result;
    }
}
