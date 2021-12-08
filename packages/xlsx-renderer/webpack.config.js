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
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        clean: true,
        library: 'xlsxRenderer',
        libraryTarget: 'umd',
        globalObject: 'this',
        path: path.resolve(__dirname, 'dist'),
        filename: 'xlsx-renderer.full.js',
    },
};
