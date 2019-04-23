import {Workbook} from "exceljs";
import IFileImporter from "./IFileImporter";
import IFileImporterConfig from "./IFileImporterConfig";

export default class ExcelJsImporter implements IFileImporter {
    constructor(private wb: Workbook) {
    }

    GetAllItems<T>(cfg: IFileImporterConfig): T[] {
        const ws = this.wb.getWorksheet(cfg.worksheet);

        const result: T[] = [];

        ws.eachRow((row, i) => {
            if (i <= cfg.rowOffset) return;

            const item: { [id: string]: any } = {};
            cfg.columns.forEach(col => {
                const mapper = col.mapper || ((v: string) => v);
                return item[col.key] = mapper(row.getCell(col.index).text);
            });

            result.push(item as T);
        });

        return result;
    }


}