import { Workbook } from 'exceljs';
import IImporter from './IImporter';
import Importer from './Importer';

export default class ImporterFactory {
    public async From(path: string): Promise<IImporter> {
        const wb = new Workbook();
        await wb.xlsx.readFile(path);

        return new Importer(wb);
    }
}
