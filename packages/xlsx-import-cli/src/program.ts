import { Command, default as commander } from 'commander';
import path from 'path';
import { ImporterFactory } from 'xlsx-import/lib/ImporterFactory';
import WritableStream = NodeJS.WritableStream;

// DEBUG:

type WriteDebugFn = (...params: any[]) => void;

let writeDebug: WriteDebugFn = (...params: any[]) => {
    return;
};

const debugOption = (program: commander.Command, writeDebugFn: WriteDebugFn) => {
    program.option('-d, --debug', 'output extra debugging');
    program.on('option:debug', () => {
        writeDebug = writeDebugFn;
    });
};

// XLSX-IMPORT:

const mainCommand = (program: commander.Command, outputStream: WritableStream) => {
    const importConfig = (file: string) => {
        if (!file.endsWith('.js')) {
            throw new Error('Config file should be a JS file with extension `.js`.');
        }
        const config = require(file);
        writeDebug('Config:', { ...config });
        return config;
    };

    program.description(
        'Import data from [input] spreadsheet (as an argument or stdin) using importer <config>. \n' +
            ' (Read more about config: https://github.com/Siemienik/XToolset/tree/master/packages/xlsx-import#3-write-a-config).',
    );
    // todo: // program.option('-o --output <filename>', 'write output json into file');
    program.arguments('<config> <input>').action(async (configPathRaw: string, inputRaw: string) => {
        const configPath = path.resolve(configPathRaw);

        writeDebug('Options:', program.opts());
        writeDebug('Arguments:', { configPathRaw, configPath, inputRaw: inputRaw.substring(0, 64) });

        const config = importConfig(configPath);

        if (inputRaw.endsWith('.xlsx')) {
            const factory = new ImporterFactory();
            const impoter = await factory.from(path.resolve(inputRaw));
            outputStream.write(JSON.stringify(impoter.getAllItems(config)) + '\n');
        } else {
            throw new Error('Input format not supported.');
        }
    });
};

// CLI:

export const cli = (argv: string[], outputStream: WritableStream, writeDebugFn: WriteDebugFn = writeDebug) => {
    const program = new Command();
    program.version(require('../package.json').version);

    debugOption(program, writeDebugFn);
    mainCommand(program, outputStream);

    program.parse(argv);
};
