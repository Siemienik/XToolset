# XLSX Import - Command Line Interface

[![NPM](https://img.shields.io/npm/l/sxi)![npm](https://img.shields.io/npm/v/sxi)](https://www.npmjs.com/package/sxi) [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/siemienik/xtoolset/xlsx-import-cli)](https://github.com/Siemienik/xtoolset/actions)

Command line of [xlsx-import](../xlsx-import). Configurable import spreadsheet files with TS types support.

Part of [XToolset](https://github.com/siemienik/XToolset) - collection of tools makes handling spreadsheet handy, easy with great developer experience.

## Usages

### Global installation

```shell script
# Install globally:

npm i -g sxi

# Usages:

sxi config.js invoice.xlsx > result.json
```

### Local installation

#### 1. Install package

```shell script
# install globally:
npm i --save sxi

# usages:
node_modules/.bin/sxi config.js invoice.xlsx > result.json

# usages with npx
npx sxi config.js invoice.xlsx > result.json
```

#### 2. Additionally, possible to use with packages.json scripts

`package.json:`

```json
{
    "scripts": {
        "import-xlsx":"sxi config.js invoice.xlsx > result.json"
    }
}
```

bash:

```shell script
npm run import-xlsx
```

## Examples

```shell script
sxi config.js invoice.xlsx > result.json

# Additionally, great piping with xlsx-renderer-cli: (required `sxr` installed)
sxi config.js invoice.xlsx | sxr template.xlsx > refreshed-invoice.xlsx

```

## Command body

`sxi [options] <config.js> [input.xlsx]`

### Arguments

* `<config.js>` indicate  the config file.
* `[input.xlsx]` data source.

<!---
### Options

* `-o --output <output-file.json>` write output json into file.
--->

### Output

`sxi` out-of-a-box write into `stdout` imported data, to save it into a file please to append `> filename.xlsx`.

<!---
Library allowing also save output into file by using option `-o --output <output-file.json>`
--->

It is also allowed using pipe parameter to forward imported data into another command.

## The Configuration File

The config inherit from `xlsx-import`. Please use link below for more information:

[**XLSX Renderer Documentation**](https://github.com/Siemienik/XToolset/tree/master/packages/xlsx-import#xlsx-import)

## Support

If any help needed, just feel free to create an issue. We will be really thankful for added links into stackoverflow topics if exists.

We are ready to provide paid support, in order that please contact me: [hi@siemienik.pl](mailto://hi@siemienik.pl) or [support@siemienik.pl](mailto://support@siemienik.pl).

---

* [MIT LICENSE](LICENSE)
