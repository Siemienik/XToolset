![GitHub Workflow Status](https://img.shields.io/github/workflow/status/siemienik/xlsx-renderer/lint-build-test)![NPM](https://img.shields.io/npm/l/xlsx-renderer)![npm](https://img.shields.io/npm/v/xlsx-renderer)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/siemienik/xlsx-renderer)![GitHub top language](https://img.shields.io/github/languages/top/siemienik/xlsx-renderer)![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/siemienik/xlsx-renderer)

# Introduction

This library makes generating xlsx files (Excel) easly. 

It consumes template which is common Excel file, then add yours data (called ViewModel). Blend it and done, as result you'll get pretty Excel.

# Getting Started:

1. install package

```
npm i xlsx-renderer --save
```

## Sample code:

```javascript
import Renderer from './xls-renderer/Renderer'

const viewModel = new MyAwesomeReportVm(); //or something else

(async () => {
    const result = await renderer.renderFromFile('./my-awesome-raport-template.xlsx', viewModel);     
    
    await result.xlsx.writeFile('./my-awesome-raport.xlsx');
})();
```

## More examples: 

for more example I invite to tests data: [click here and check `Renderer` folders](./tests/integration/data)

# Documentation:

## Cells:

| Category | Name | Order | match rule | Description | More info |
|----------|-----:|-------|--------|-------------|:---------|
| - | [BaseCell](./src/cell/BaseCell.ts) | n/o | n/o | All Cell\`s definition classes extend it. | **abstract** |
| Content | [NormalCell](./src/cell/NormalCell.ts) | 1 | not started by `##` or `#!` | This one copy all styles, width, properties and value form template.  | **default** |
| Content | [VariableCell](./src/cell/VariableCell.ts) | 3 | `## pathToVariable ` | Write variable from `ViewModel`. <br/> Paths to object's property or array item are allowed.<br/> When asking about undefined variable it returns empty string. | **Paths examples:** <br/> `simplePath` <br/> `someObject.property` <br/> `array.0.field` <br/> `items.1.path.to.object.prop`|
| Content | [HyperlinkCell](./src/cell/HyperlinkCell.ts) | 5 | `#! HYPERLINK pathToLabel pathToTarget` | Create a hyperlink. | *Paths resolve exactly same as VariableCell* |
| Content | **TODO: describe it!** [FormulaCell](./src/cell/FormulaCell.ts) | | | | |
| Navigation | [EndRowCell](./src/cell/EndRowCell.ts) | 2 | `#! END_ROW` | Go to the beginning of next row |  |
| Worksheet<br/>Navigation<br/>Loop | [FinishCell](./src/cell/FinishCell.ts) | 7 | `#! FINISH conditionPath` | Finish rendering for current worksheet and: <br/> 1) go to next worksheet if `conditionPath===true`<br/> 2) repeat this template worksheet again (`conditionPath === false`) - looping through worksheets <br/> 3) finished whole rendering when this worksheet is the last one.   | **Examples:**<br/> `#! FINISHED ` or `#! FINISHED itemFromLoop.__iterated` |
| Worksheet | [WsNameCell](./src/cell/WsNameCell.ts) | 13 | `#! WS_NAME pathToVariable` | Set worksheet's name.  | **Examples:** <br/> `#! WS_NAME worksheetName` <br/> `#! WS_NAME item.title` <br/> `#! WS_NAME translatedNames.0` |
| Loop | **TODO: describe it!** [DumpColsCell](./src/cell/DumpColsCell.ts) | | | | |
| Loop | **TODO: tests done: simple, stripped; tests todo: nested, with formula, special fields, through worksheets,** [ForEachCell](./src/cell/ForEachCell.ts) | 6 | #! FOR_EACH item items | Begin the loop named `item`, set the first element of `items` into `item` and go to the beginning of next line.| Connected to: `ContinueCell`, `EndLoopCell`, `DeleteCell`, `FinishedCell`, `SumCell`, `AverageCell`. |
| Loop | [ContinueCell](./src/cell/ContinueCell.ts) | 9 | `#! CONTINUE item` | Iterate to next element of loop named `item` (check `ForEachCell` for more information) and navigate to the beginning of new line. | |
| Loop | [EndLoopCell](./src/cell/EndLoopCell.ts) | 8 | `#! END_LOOP item` | Mark cell when the loop `item` finished. | |
| Aggregation| [SumCell](./src/cell/SumCell.ts) | 11 | `#! SUM item` | Write sum formulae for current column and the `item`'s rows.  | [Example](./tests/integration/data/Renderer007-ForEach-Sum/) |
| Aggregation | [AverageCell](./src/cell/AverageCell.ts) | 12 | `#! AVERAGE item` | Write average formulae for current column and the `item`'s rows.  | [Example](./tests/integration/data/Renderer009-ForEach-Average/) |
| View Model | **TODO: test - nested loop** [DeleteCell](./src/cell/DeleteCell.ts) | 14 | `#! DELETE pathToVariable` | Delete variable, useful for nested loops.|  [Example](./tests/integration/data/Renderer009-ForEach-Average/)  |


## Commands [PREVIOUS VERSION]:

1. `#! END_ROW`
4. `#! DELETE varName`
5. `#! HYPERLINK labelVar urlVar`
6. `#! WS_NAME nameVar` set worksheet name
7. `#! FOR_EACH item collection` (to write item property `## item.property`),
8. `#! CONTINUE item` item is set to the next collection item.
9. `#! END_LOOP item`
10. `#! AVERAGE item` write average formula of all items from previous for-each, it has to be placed after the for-each was finished.
11. `#! SUM item` similar to average
12. `#! DUMP_COLS arrayVar` write to next columns all array items (1 item = 1 column)

 
[LICENSE](LICENSE)
