import CellTemplatePool from "../xls-renderer/CellTemplatePool";

export default class CellTemplateDebugPool extends CellTemplatePool {
    /**
     * do normal match and log in console result.
     *
     * @param {Cell} cell
     * @returns {BaseCell}
     */
    match(cell) {
        const result = super.match(cell);

        console.log(result, cell && cell.value);

        return result;
    }
}
