import Renderer from './xls-template-engine/Rederer'
import DebugCellTemplatePool from "./xls-template-engine-debug/CellTemplateDebugPool";
import CellTemplatePool from "./xls-template-engine/CellTemplatePool";
// import  from 'xlsx'

//*
const renderer = new Renderer(new CellTemplatePool());
/*/
const renderer = new Renderer(new DebugCellTemplatePool());
//*/
const template = {
    0: "## test",
    1: "asd",
    2: " ",
    3: "",
    4: "## super.a",
    5: "#! FOR_EACH i items",
    6: "## i.firstName",
    7: "## i.secondName",

    8: "#! CONTINUE i",

    9: "## i.firstName",
    10: "heheszek",
    11: "#! END_LOOP i",
    12: "nie w 12",
    13: "#! FINISH",
    14: "## super"
};

const template2 = {
    0: "## test",
    1: "asd",
    2: " ",
    3: "",
    4: "## super.a",
    5: "#! FOR_EACH i items",
    6: "## i.firstName",
    7: "## i.secondName",

    8: "#! CONTINUE i",

    9: "## i.firstName",
    10: "heheszek",
    11: "#! END_LOOP i",
    12: "nie w 12",
    13: "",
    14: "",
    15: "",
    16: "#! FINISH",
    17: "",
    18: "",
};
console.log(renderer.render(
    template, {
        test: 123, super: {a: 'hulahop'}, items: [
            {firstName: "fn1", secondName: "sn1"},
            {firstName: "fn2", secondName: "sn2"},
            {firstName: "fn3", secondName: "sn3"},
        ]
    }));

console.log(renderer.render(
    template, {
        test: 'drugi plik', super: {a: ':)'}, items: [
            {firstName: "b1", secondName: "bb1"},
        ]
    }));


console.log(renderer.render(
    template2, {
        test: 'drugi plik', super: {a: ':)'}, items: []
    }));
/*todo
3. xlsx library 
5. pobieranie parametrów w loop
6. 



*/
// console.log(renderer.render(
//     {
//         0: "## test",
//         1: "asd",
//         2: " ",
//         3: "",
//         4: "## super.a",
//         5: "#! FOR_EACH i items",
//         6: "## i.firstName",
//         7: "## i.secondName",
//
//         8: "#! CONTINUE i",
//
//         9: "## i.firstName",
//         10: "heheszek",
//         11: "#! END_LOOP i",
//         12: "nie w 12",
//         13: "#! FINISH",
//         14: "## super"
//     }, {
//         test: 123, super: {a: 'hulahop'}, items: [
//             {firstName: "fn1", secondName: "sn1"},
//             {firstName: "fn2", secondName: "sn2"},
//             {firstName: "fn3", secondName: "sn3"},
//             {firstName: "fn4", secondName: "sn4"},
//             {firstName: "fn5", secondName: "sn1"},
//         ]
//     }));