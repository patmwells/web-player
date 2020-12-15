const nodeExternals = require('webpack-node-externals');
const { webpack: { server } } = require('../paths.js');

const dev = {
    mode: 'development'
};

const prod = {
    mode: 'production',
    target: 'node',
    name: 'server',
    externals: [nodeExternals()],
    entry: server.entry,
    output: {
        publicPath: '/',
        path: server.output.path,
        filename: server.output.filename
    }
};

module.exports = {
    dev,
    prod
};
