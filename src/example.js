import Renderer from './xls-renderer/Renderer'
import DebugCellTemplatePool from "./xls-renderer-debug/CellTemplateDebugPool";
import CellTemplatePool from "./xls-renderer/CellTemplatePool";
import {Workbook} from 'exceljs'
//*
const renderer = new Renderer(new CellTemplatePool());
/*/
const renderer = new Renderer(new DebugCellTemplatePool());

//*/
class LocalisationViewModel {
    constructor(localisation) {
        this.id_sl = 'id_sl';
        this.network = 'network';
        this.province = 'province';
        this.city = 'city';
        this.address = 'address';
        this.onlineCard = null;
        this.shoppingCenter = 'shoppingCenter';
        this.audience = 'audience';
        this.totalDisplays = 'totalDisplays';
        this.g8 = 'g8';
        this.g10 = 'g10';
        this.g12 = 'g12';
        this.agglomeration = 'agglomeration';
        this.population = 'population';
        this.outpost = 'outpost';
        this.displaySize = 'displaySize';
        this.spotResolution = 'spotResolution';
        this.realResolution = 'realResolution';
        this.soft = 'soft';
        this.trigger = 'trigger';
        this.postCode = 'postCode';
        this.coordinates = 'coordinates';
        this.led = 'led';
        this.openHour = 'openHour';
        this.banPoliticial = 'banPoliticial';
    }

}

class CalculatorViewModel {
    constructor(localisations) {
        this.onlineCardLabel = "Karta on-line";
        this.localisations = localisations.map(x => new LocalisationViewModel(x));
    }
}

(async () => {
    const locs = [];
    locs.push({});
    locs.push({});
    locs.push({});
    locs.push({});
    locs.push({});
    locs.push({});
    locs.push({});
    locs.push({});
    const result = await renderer.render(async () => {
        const template = new Workbook();
        const workbook = await template.xlsx.readFile('./calculator-template.xlsx');
        return workbook;
    }, new CalculatorViewModel(locs));

    await result.xlsx.writeFile('./out-calc.xlsx');
})();
