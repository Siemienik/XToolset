const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'production',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: path.resolve(__dirname, 'node_modules'),
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'xlsx-renderer.js',
        clean: true,
        library: {
            name: 'xlsxRenderer',
            type: 'umd',
        },
        globalObject: 'this',
    },
    externals: {
        exceljs: 'ExcelJS',
    },
};
