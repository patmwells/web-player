const LiveReloadPlugin = require('webpack-livereload-plugin');
const { webpack: { test } } = require('../paths.js');

const dev = {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins:[
        new LiveReloadPlugin({
            port: 35728,
            hostname: 'localhost',
            appendScriptTag: true
        })
    ]
};

const prod = {
    mode: 'production',
    target: 'web',
    devtool: 'source-map',
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
