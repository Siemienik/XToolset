![GitHub Workflow Status](https://img.shields.io/github/workflow/status/siemienik/xlsx-renderer-cli/lint-build-test)![NPM](https://img.shields.io/npm/l/sxr)![npm](https://img.shields.io/npm/v/sxr)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/siemienik/xlsx-renderer-cli)![GitHub top language](https://img.shields.io/github/languages/top/siemienik/xlsx-renderer-cli)![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/siemienik/xlsx-renderer-cli)
[![Join the chat at https://gitter.im/Siemienik/community](https://badges.gitter.im/Siemienik/community.svg)](https://gitter.im/Siemienik/community)

# Getting Started:

## Global instalation

```
#install globally:
npm i -g sxr

#usages:
sxr --model vm.json template.xlsx > output.xlsx
```

## Local instalation

1. Or install package

```
#install globally:
npm i --save sxr

#usages:
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

* `<template>` indicate which file is used as the template
* `[model]` view model as a json used to generate a spreadsheet,

## Options

* `-o --output <filename>` write to filename
* `-m --model <filename>` read filename as a `[model]` (using both is denied)
* `-o --output <filename>` write result into filename

## Output

`sxr` out-of-a-box pushes generated files into `stdout`, to save it into file please to append ` > filename.xlsx`.

Library allowing also save output into file by using option `-o --output <filename>`

It is also alloved using pipe parameter to forward generated file into another command.

# The template file

The template structure is inherited from `xlsx-renderer`. Please use link below for more information:

[**Documentation**](https://github.com/Siemienik/xlsx-renderer#documentation)

---

[LICENSE](LICENSE)
