import {Workbook} from "exceljs";
import ExcelJsImporter from "./ExcelJsImporter";
import IFileImporter from "./IFileImporter";

export default class ExcelJsImporterFactory {
    async From(path: string): Promise<IFileImporter> {
        const wb = new Workbook();
        await wb.xlsx.readFile(path);

        return new ExcelJsImporter(wb);
    }
}