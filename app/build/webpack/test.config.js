const LiveReloadPlugin = require('webpack-livereload-plugin');
const { webpack: { test } } = require('../paths.js');

const dev = {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins:[
        new LiveReloadPlugin({
            port: process.env.TESTS_LR_PORT,
            hostname: 'localhost',
            appendScriptTag: true
        })
    ]
};

const prod = {
    mode: 'development',
    target: 'web',
    devtool: 'source-map',
    name: 'browser-tests',
    entry: test.entry,
    output: {
        publicPath: '/',
        path: test.output.path,
        filename: test.output.filename
    }
};

module.exports = {
    dev,
    prod
};
