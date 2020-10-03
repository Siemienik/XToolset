import { Workbook } from 'exceljs';
import IImporter from './IImporter';
import Importer from './Importer';

// todo obsolete default export
export default class ImporterFactory {
    // todo obsolete and rename to loverCase
    public async From(path: string): Promise<IImporter> {
        const wb = new Workbook();
        await wb.xlsx.readFile(path);

        return new Importer(wb);
    }
}
