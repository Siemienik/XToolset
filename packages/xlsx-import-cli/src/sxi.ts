#!/usr/bin/env node

import { cli } from './program';

const parse = (args: string[]) => cli(args, process.stdout, console.debug);

if (process.stdin.isTTY) {
    parse(process.argv);
} else {
    let stdin = '';
    process.stdin.on('readable', () => {
        const chunk = process.stdin.read();
        if (chunk !== null) {
            stdin += chunk;
        }
    });
    process.stdin.on('end', () => {
        parse([...process.argv, stdin]);
    });
}
