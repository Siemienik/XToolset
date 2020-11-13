import { Command, default as commander } from 'commander';
import * as fs from 'fs';
import { Stream } from 'stream';
import { Renderer } from 'xlsx-renderer';
const version = '0.0.1';

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

// XLSX-RENDERER:

const mainCommand = (program: commander.Command, outputStream: Stream) => {
    const readModel = (file?: string) => {
        if (file) {
            return fs.readFileSync(file, 'utf8');
        }
        return null;
    };

    program.description('Generate spreadsheet based on <template> and [model]');
    program.option('-o --output <filename>', 'write output into file');
    program.option('-m --model <filename>', 'read file as a [model] (using both is denied)');
    program.arguments('<template> [model]').action(async (template: string, modelRaw?: string) => {
        writeDebug('Options:', program.opts());
        writeDebug('Arguments:', { template, modelRaw });

        if (program.model && modelRaw) {
            throw new Error('Using both `-m --model <filename>` and `[model]` is denied.');
        }

        const model = JSON.parse(modelRaw || readModel(program.model) || '{}');

        writeDebug('Model: ', model);

        const renderer = new Renderer();
        const result = await renderer.renderFromFile(template, model);

        if (program.output) {
            // @ts-ignore
            result.xlsx.writeFile(program.output);
        } else {
            // @ts-ignore
            result.xlsx.write(outputStream);
        }
    });
};

// CLI:

export const cli = (argv: string[], outputStream: Stream, writeDebugFn: WriteDebugFn = writeDebug) => {
    const program = new Command();
    program.version(version);

    debugOption(program, writeDebugFn);
    mainCommand(program, outputStream);

    program.parse(argv);
};
