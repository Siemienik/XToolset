[![NPM](https://img.shields.io/npm/l/xlsx-renderer)![npm](https://img.shields.io/npm/v/sxr)](https://www.npmjs.com/package/sxr) [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/siemienik/xtoolset/xlsx-renderer-cli)](https://github.com/Siemienik/xtoolset/actions)

[![Join the chat at https://gitter.im/Siemienik/community](https://badges.gitter.im/Siemienik/community.svg)](https://gitter.im/Siemienik/community)

# XLSX-Renderer-CLI:

Command line of [xlsx-renderer](../xlsx-renderer). Generates spreadsheet files based on the template with view model.

## Global installation

```
# Install globally:

npm i -g sxr

# Usages:

sxr --model vm.json template.xlsx > output.xlsx
```

## Local installation

1. Install package

```
# install globally:
npm i --save sxr

# usages:
node_modules/.bin/sxr --model vm.json template.xlsx > output.xlsx
```

2. Additionally, able to use with packages.json scripts:

`package.json:`
```js
scripts:{
    "generate-xlsx":"sxr --model vm.json template.xlsx > output.xlsx"
}
```

bash:
```
npm run generate-xlsx
```

# Examples:

```
cat vm.json | sxr template.xlsx > output.xlsx

sxr template.xlsx "{\"jsonData\":true}" > output.xlsx

sxr --model vm.json template.xlsx > output.xlsx

sxr --model vm.json -o output.xlsx  template.xlsx

sxr -o output.xlsx  template.xlsx "{\"jsonData\":true}"
```

# Command body:

`sxr [options] <template> [model]`


## Arguments

* `<template>` indicate  the template file,
* `[model]` view model as a json used to generate a spreadsheet,

## Options

* `-o --output <filename>` write to filename
* `-m --model <filename>` read filename as a `[model]` (using both is denied)
* `-o --output <filename>` write result into filename

## Output

`sxr` out-of-a-box pushes generated files into `stdout`, to save it into a file please to append ` > filename.xlsx`.

Library allowing also save output into file by using option `-o --output <filename>`

It is also allowed using pipe parameter to forward generated file into another command.

# The template file

The template structure inherit from `xlsx-renderer`. Please use link below for more information:

[**Documentation**](https://github.com/Siemienik/XToolset/tree/master/packages/xlsx-renderer#documentation)

---

[LICENSE](LICENSE)
